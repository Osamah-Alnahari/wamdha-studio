"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DocumentUploader } from "@/components/document-uploader";
import { PagesList } from "@/components/pages-list";
import { SummarizedPagesList } from "@/components/summarized-pages-list";
import { PageViewer } from "@/components/page-viewer";
import { SummaryViewer } from "@/components/summary-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  summarizeText as apiSummarizeText,
  type PageSummary,
} from "@/lib/api-client";
import { getRead } from "@/src/graphql/queries";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { deleteSlidesByBook, uploadSlides } from "@/lib/actions/book.actions";
import { getBookContent } from "@/lib/actions/slide.actions";
import { uploadData } from "aws-amplify/storage";
import { delay } from "@/lib/utils";
import { FileText, AlignLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface DocumentSplitterProps {
  bookId?: string;
}

interface BookInfo {
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
  id?: string;
}

interface DocumentState {
  pages: string[];
  pageSummaries: PageSummary[];
  fileName: string;
  fileType: "word" | "pdf" | null;
  selectedPageIndex: number;
  viewMode: "pages" | "summaries";
  startedFromScratch: boolean;
}

interface LoadingState {
  isProcessing: boolean;
  isLoadingData: boolean;
  isUploading: boolean;
  isSaving: boolean;
  isSummarizingAll: boolean;
}

interface ProcessingState {
  summarizingPageIndices: Set<number>;
  error: string | null;
}

export function DocumentSplitter({ bookId }: DocumentSplitterProps) {
  const { client, isLoading: clientLoading } = useAmplifyClient();
  const router = useRouter();

  // Consolidated state objects
  const [documentState, setDocumentState] = useState<DocumentState>({
    pages: [],
    pageSummaries: [],
    fileName: "",
    fileType: null,
    selectedPageIndex: 0,
    viewMode: "pages",
    startedFromScratch: false,
  });

  const [bookInfo, setBookInfo] = useState<BookInfo>({
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isProcessing: false,
    isLoadingData: true,
    isUploading: false,
    isSaving: false,
    isSummarizingAll: false,
  });

  const [processingState, setProcessingState] = useState<ProcessingState>({
    summarizingPageIndices: new Set(),
    error: null,
  });

  // Refs for tracking operations
  const abortControllerRef = useRef<AbortController | null>(null);

  // Helper functions
  const updateDocumentState = useCallback((updates: Partial<DocumentState>) => {
    setDocumentState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateLoadingState = useCallback((updates: Partial<LoadingState>) => {
    setLoadingState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateProcessingState = useCallback(
    (updates: Partial<ProcessingState>) => {
      setProcessingState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const sanitizeSummary = useCallback(
    (summary: Partial<PageSummary>): PageSummary => ({
      title:
        typeof summary.title === "string" && summary.title.trim()
          ? summary.title
          : "Untitled Summary",
      content: typeof summary.content === "string" ? summary.content : "",
      imageUrl: summary.imageUrl,
      imagePosition: summary.imagePosition || "bottom",
      isLoading: !!summary.isLoading,
      isGeneratingImage: !!summary.isGeneratingImage,
    }),
    []
  );

  // Load book data on mount
  useEffect(() => {
    if (!bookId || clientLoading || !client) {
      if (!bookId) {
        updateLoadingState({ isLoadingData: false });
      }
      return;
    }

    const loadBookData = async () => {
      updateLoadingState({ isLoadingData: true });
      try {
        const response = await client.graphql({
          query: getRead,
          variables: { id: bookId },
          authMode: "userPool",
        });

        if (response?.data?.getRead) {
          const book = response.data.getRead;
          const newBookInfo: BookInfo = {
            title:
              typeof book.title === "string" ? book.title : "Untitled Book",
            author:
              typeof book.AuthorName === "string"
                ? book.AuthorName
                : "Unknown Author",
            description:
              typeof book.description === "string" ? book.description : "",
            coverImageUrl: book.thumbnailUrl,
            isOwnedByUser: !!book.userId,
          };

          setBookInfo(newBookInfo);
          updateDocumentState({ fileName: newBookInfo.title });

          // Load book content
          const content = await getBookContent(client, bookId);
          if (content) {
            const summaries: PageSummary[] = content.map((slide: any) => ({
              title: `Title ${slide.slideNumber}`,
              content: slide.text,
              imageUrl: slide.imageUrl || undefined,
              imagePosition: "bottom",
              isLoading: false,
              isGeneratingImage: false,
            }));

            updateDocumentState({
              pageSummaries: summaries,
              fileType: "word",
              selectedPageIndex: 0,
              viewMode: "summaries",
            });

            toast.success("Loaded saved content", {
              description: `Loaded ${content.length} pages from "${newBookInfo.title}"`,
            });
          }
        }
      } catch (error) {
        console.error("Error loading book data:", error);
        toast.error("Error loading book data", {
          description:
            "There was a problem loading your book data. Please try again.",
        });
      } finally {
        updateLoadingState({ isLoadingData: false });
      }
    };

    loadBookData();
  }, [bookId, client, clientLoading, updateDocumentState, updateLoadingState]);

  // Document processing handlers
  const handleDocumentProcessed = useCallback(
    async (result: string[], name: string, type: "word" | "pdf") => {
      const initialSummaries = result.map((page, index) => {
        const textContent = page.replace(/<[^>]*>/g, " ").trim();
        return {
          title: `Summary of Page ${index + 1}`,
          content: textContent.substring(0, 200) + "...",
          imageUrl: undefined,
          imagePosition: "bottom" as const,
          isLoading: false,
          isGeneratingImage: false,
        };
      });

      updateDocumentState({
        pages: result,
        pageSummaries: initialSummaries,
        fileName: name,
        fileType: type,
        selectedPageIndex: 0,
        startedFromScratch: false,
      });

      toast.success("Document processed successfully", {
        description: `${result.length} pages extracted from ${name}`,
      });
    },
    [updateDocumentState]
  );

  const handleStartFromScratch = useCallback(async () => {
    const initialPage: PageSummary = {
      title: "New Page 1",
      content: "Add your summary content here...",
      imageUrl: undefined,
      imagePosition: "bottom",
      isGeneratingImage: false,
    };

    updateDocumentState({
      pages: [],
      pageSummaries: [initialPage],
      fileName: bookInfo.title || "My Summaries",
      fileType: "word",
      selectedPageIndex: 0,
      startedFromScratch: true,
      viewMode: "summaries",
    });

    toast.success("Started from scratch", {
      description: "You can now add pages and create your summaries.",
    });
  }, [bookInfo.title, updateDocumentState]);

  // Page management handlers
  const handlePageSelect = useCallback(
    (index: number) => {
      const maxIndex =
        documentState.viewMode === "pages"
          ? documentState.pages.length - 1
          : documentState.pageSummaries.length - 1;

      if (index >= 0 && index <= maxIndex) {
        updateDocumentState({ selectedPageIndex: index });
      } else {
        console.warn(`Invalid page index: ${index}, max: ${maxIndex}`);
        updateDocumentState({ selectedPageIndex: 0 });
      }
    },
    [
      documentState.viewMode,
      documentState.pages.length,
      documentState.pageSummaries.length,
      updateDocumentState,
    ]
  );

  const handleSummaryUpdate = useCallback(
    async (summary: PageSummary, pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= documentState.pageSummaries.length) {
        console.error("Invalid page index for update:", pageIndex);
        return;
      }

      updateLoadingState({ isSaving: true });
      try {
        const sanitizedSummary = sanitizeSummary(summary);

        setDocumentState((prev) => ({
          ...prev,
          pageSummaries: prev.pageSummaries.map((s, i) =>
            i === pageIndex ? sanitizedSummary : s
          ),
        }));
      } catch (error) {
        console.error("Error updating summary:", error);
        toast.error("Failed to save summary", {
          description:
            "There was an error saving your changes. Please try again.",
        });
      } finally {
        updateLoadingState({ isSaving: false });
      }
    },
    [documentState.pageSummaries.length, sanitizeSummary, updateLoadingState]
  );

  const handleImageGenerationStart = useCallback(
    (pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= documentState.pageSummaries.length) {
        console.error("Invalid page index for image generation:", pageIndex);
        return;
      }

      setDocumentState((prev) => ({
        ...prev,
        pageSummaries: prev.pageSummaries.map((s, i) =>
          i === pageIndex ? { ...s, isGeneratingImage: true } : s
        ),
      }));
    },
    [documentState.pageSummaries.length]
  );

  const handleImageGenerationComplete = useCallback(
    async (pageIndex: number, imageUrl: string) => {
      if (pageIndex < 0 || pageIndex >= documentState.pageSummaries.length) {
        console.error(
          "Invalid page index for image generation completion:",
          pageIndex
        );
        return;
      }

      try {
        setDocumentState((prev) => ({
          ...prev,
          pageSummaries: prev.pageSummaries.map((s, i) =>
            i === pageIndex ? { ...s, imageUrl, isGeneratingImage: false } : s
          ),
        }));
      } catch (error) {
        console.error(
          `Error completing image generation for page ${pageIndex + 1}:`,
          error
        );

        setDocumentState((prev) => ({
          ...prev,
          pageSummaries: prev.pageSummaries.map((s, i) =>
            i === pageIndex ? { ...s, isGeneratingImage: false } : s
          ),
        }));

        toast.error("Error processing generated image", {
          description: "There was a problem processing the generated image.",
        });
      }
    },
    [documentState.pageSummaries.length]
  );

  const handleReorderPages = useCallback(
    async (reorderedPages: PageSummary[]) => {
      if (
        !Array.isArray(reorderedPages) ||
        reorderedPages.length !== documentState.pageSummaries.length
      ) {
        console.error("Invalid reordered pages array:", reorderedPages);
        return;
      }

      updateLoadingState({ isSaving: true });
      try {
        const validatedPages = reorderedPages.map(sanitizeSummary);
        updateDocumentState({ pageSummaries: validatedPages });

        toast.success("Pages reordered successfully", {
          description: "The new page order has been applied locally.",
        });
      } catch (error) {
        console.error("Error reordering pages:", error);
        toast.error("Failed to reorder pages", {
          description:
            "There was an error saving the new page order. Please try again.",
        });
      } finally {
        updateLoadingState({ isSaving: false });
      }
    },
    [
      documentState.pageSummaries.length,
      sanitizeSummary,
      updateDocumentState,
      updateLoadingState,
    ]
  );

  const handleAddNewPage = useCallback(
    async (options?: {
      duplicate?: boolean;
      insertAfterIndex?: number;
      template?: "blank" | "detailed";
    }) => {
      const MAX_PAGES = 100;
      if (documentState.pageSummaries.length >= MAX_PAGES) {
        toast.error("Maximum page limit reached", {
          description: `You cannot add more than ${MAX_PAGES} pages.`,
        });
        return;
      }

      updateLoadingState({ isSaving: true });
      try {
        const insertAtIndex =
          options?.insertAfterIndex !== undefined
            ? options.insertAfterIndex + 1
            : documentState.pageSummaries.length;

        let newPage: PageSummary;

        if (
          options?.duplicate &&
          insertAtIndex > 0 &&
          insertAtIndex <= documentState.pageSummaries.length
        ) {
          const sourcePage =
            documentState.pageSummaries[
              options.insertAfterIndex || documentState.selectedPageIndex
            ];
          newPage = {
            title: `${sourcePage.title} (Copy)`,
            content: sourcePage.content,
            imageUrl: sourcePage.imageUrl,
            imagePosition: sourcePage.imagePosition,
            isGeneratingImage: false,
          };
        } else {
          if (options?.template === "detailed") {
            newPage = {
              title: `New Page ${documentState.pageSummaries.length + 1}`,
              content:
                "# Summary Heading\n\nAdd your detailed summary here...\n\n## Key Points\n\n- First point\n- Second point\n- Third point\n\n## Conclusion\n\nSummarize your main points here.",
              imageUrl: undefined,
              imagePosition: "bottom",
              isGeneratingImage: false,
            };
          } else {
            newPage = {
              title: `New Page ${documentState.pageSummaries.length + 1}`,
              content: "Add your summary content here...",
              imageUrl: undefined,
              imagePosition: "bottom",
              isGeneratingImage: false,
            };
          }
        }

        const newSummaries = [...documentState.pageSummaries];
        newSummaries.splice(insertAtIndex, 0, newPage);

        updateDocumentState({
          pageSummaries: newSummaries,
          selectedPageIndex: insertAtIndex,
        });

        toast.success("New page added", {
          description: "A new page has been added to your summaries.",
        });
      } catch (error) {
        console.error("Error adding new page:", error);
        toast.error("Failed to add new page", {
          description:
            "There was an error adding a new page. Please try again.",
        });
      } finally {
        updateLoadingState({ isSaving: false });
      }
    },
    [
      documentState.pageSummaries,
      documentState.selectedPageIndex,
      updateDocumentState,
      updateLoadingState,
    ]
  );

  const handleDuplicatePage = useCallback(async () => {
    if (
      documentState.selectedPageIndex < 0 ||
      documentState.selectedPageIndex >= documentState.pageSummaries.length
    ) {
      toast.error("Cannot duplicate page", {
        description: "No valid page is selected to duplicate.",
      });
      return;
    }

    await handleAddNewPage({
      duplicate: true,
      insertAfterIndex: documentState.selectedPageIndex,
    });
  }, [
    documentState.selectedPageIndex,
    documentState.pageSummaries.length,
    handleAddNewPage,
  ]);

  const handleDeletePage = useCallback(
    async (index: number) => {
      if (index >= 0 && index < documentState.pageSummaries.length) {
        updateLoadingState({ isSaving: true });
        try {
          const newSummaries = [...documentState.pageSummaries];
          newSummaries.splice(index, 1);

          let newSelectedIndex = documentState.selectedPageIndex;
          if (documentState.selectedPageIndex >= newSummaries.length) {
            newSelectedIndex = Math.max(0, newSummaries.length - 1);
          } else if (documentState.selectedPageIndex === index) {
            newSelectedIndex = Math.max(0, index - 1);
          }

          updateDocumentState({
            pageSummaries: newSummaries,
            selectedPageIndex: newSelectedIndex,
          });

          toast.success("Page deleted", {
            description: `Page ${index + 1} has been removed.`,
          });
        } catch (error) {
          console.error("Error deleting page:", error);
          toast.error("Failed to delete page", {
            description:
              "There was an error deleting the page. Please try again.",
          });
        } finally {
          updateLoadingState({ isSaving: false });
        }
      }
    },
    [
      documentState.pageSummaries,
      documentState.selectedPageIndex,
      updateDocumentState,
      updateLoadingState,
    ]
  );

  // Summary generation handlers
  const handleGenerateSummary = useCallback(
    (pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= documentState.pages.length) return;

      return new Promise<void>(async (resolve, reject) => {
        try {
          setProcessingState((prev) => ({
            ...prev,
            summarizingPageIndices: new Set([
              ...prev.summarizingPageIndices,
              pageIndex,
            ]),
          }));

          const pageContent = documentState.pages[pageIndex]
            .replace(/<[^>]*>/g, " ")
            .trim();
          const result = await apiSummarizeText(pageContent);

          const validatedTitle =
            typeof result.imageTitle === "string"
              ? result.imageTitle
              : `Summary ${pageIndex + 1}`;
          const validatedSummary =
            typeof result.summary === "string" ? result.summary : "";

          setDocumentState((prev) => ({
            ...prev,
            pageSummaries: prev.pageSummaries.map((s, i) =>
              i === pageIndex
                ? {
                    ...s,
                    title: validatedTitle,
                    content: validatedSummary,
                    isLoading: false,
                  }
                : s
            ),
          }));

          toast.success("Summary generated", {
            description: `Summary for page ${pageIndex + 1} has been created.`,
          });

          setProcessingState((prev) => ({
            ...prev,
            summarizingPageIndices: new Set(
              [...prev.summarizingPageIndices].filter((i) => i !== pageIndex)
            ),
          }));

          resolve();
        } catch (error) {
          console.error("Error generating summary:", error);

          setProcessingState((prev) => ({
            ...prev,
            summarizingPageIndices: new Set(
              [...prev.summarizingPageIndices].filter((i) => i !== pageIndex)
            ),
          }));

          toast.error("Failed to generate summary", {
            description:
              "There was an error generating the summary. Please try again.",
          });
          reject(error);
        }
      });
    },
    [documentState.pages, updateDocumentState, updateProcessingState]
  );

  const handleSummarizeAllPages = useCallback(async () => {
    if (documentState.pages.length === 0) {
      toast.error("No pages to summarize", {
        description: "Please upload a document first.",
      });
      return;
    }

    updateLoadingState({ isSummarizingAll: true });
    toast.info(`Summarizing ${documentState.pages.length} pages`, {
      description: "This may take a moment...",
    });

    let completedCount = 0;
    let failedCount = 0;

    const batchSize = 3;
    for (let i = 0; i < documentState.pages.length; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, documentState.pages.length - i) },
        (_, j) => i + j
      );

      setProcessingState((prev) => ({
        ...prev,
        summarizingPageIndices: new Set([
          ...prev.summarizingPageIndices,
          ...batch,
        ]),
      }));

      await Promise.all(
        batch.map(async (pageIndex) => {
          try {
            const pageContent = documentState.pages[pageIndex]
              .replace(/<[^>]*>/g, " ")
              .trim();
            const result = await apiSummarizeText(pageContent);

            const validatedTitle =
              typeof result.imageTitle === "string"
                ? result.imageTitle
                : `Summary ${pageIndex + 1}`;
            const validatedSummary =
              typeof result.summary === "string" ? result.summary : "";

            setDocumentState((prev) => ({
              ...prev,
              pageSummaries: prev.pageSummaries.map((s, i) =>
                i === pageIndex
                  ? {
                      ...s,
                      title: validatedTitle,
                      content: validatedSummary,
                      isLoading: false,
                    }
                  : s
              ),
            }));

            completedCount++;

            if (
              completedCount % 3 === 0 ||
              completedCount + failedCount === documentState.pages.length
            ) {
              toast.success(
                `Progress: ${completedCount}/${documentState.pages.length} pages summarized`,
                {
                  description: "Summarization is in progress...",
                  duration: 3000,
                }
              );
            }
          } catch (error) {
            console.error(`Error summarizing page ${pageIndex + 1}:`, error);
            failedCount++;
          } finally {
            setProcessingState((prev) => ({
              ...prev,
              summarizingPageIndices: new Set(
                [...prev.summarizingPageIndices].filter((i) => i !== pageIndex)
              ),
            }));
          }
        })
      );
    }

    if (failedCount > 0) {
      toast.error(`Summarization completed with errors`, {
        description: `Generated ${completedCount} summaries, ${failedCount} failed.`,
      });
    } else {
      toast.success("All pages summarized", {
        description: `Successfully summarized ${completedCount} pages.`,
      });
    }

    updateLoadingState({ isSummarizingAll: false });
    updateDocumentState({ viewMode: "summaries" });
  }, [
    documentState.pages,
    documentState.pageSummaries,
    updateDocumentState,
    updateLoadingState,
    updateProcessingState,
  ]);

  const handleGenerateAllImages = useCallback(async () => {
    const summariesToProcess = documentState.pageSummaries.filter(
      (summary) => !summary.imageUrl && !summary.isGeneratingImage
    );

    if (summariesToProcess.length === 0) {
      toast.info("No pages need images", {
        description:
          "All pages already have images or are currently generating.",
      });
      return;
    }

    toast.info(`Generating ${summariesToProcess.length} images`, {
      description: "This may take a moment...",
    });

    let completedCount = 0;
    let failedCount = 0;

    // Set all pages to generating state
    setDocumentState((prev) => ({
      ...prev,
      pageSummaries: prev.pageSummaries.map((s) =>
        !s.imageUrl && !s.isGeneratingImage
          ? { ...s, isGeneratingImage: true }
          : s
      ),
    }));

    const pagesToProcess = documentState.pageSummaries
      .map((summary, index) => ({ summary, index }))
      .filter(({ summary }) => !summary.imageUrl && !summary.isGeneratingImage);

    const batchSize = 3;
    for (let i = 0; i < pagesToProcess.length; i += batchSize) {
      const batch = pagesToProcess.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async ({ index }) => {
          try {
            const width = 600;
            const height = 400;
            const randomId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://picsum.photos/seed/${randomId}/${width}/${height}`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "generated-image.jpg", {
              type: blob.type,
            });

            const uniqueId = uuidv4();
            const extension = file.name.split(".").pop();
            const key = `public/${uniqueId}.${extension}`;

            await uploadData({
              path: key,
              data: file,
              options: {
                onProgress: ({ transferredBytes, totalBytes = 100 }) => {
                  const percent = Math.round(
                    (transferredBytes / totalBytes) * 100
                  );
                  console.log(
                    `Image upload progress (page ${index + 1}): ${percent}%`
                  );
                },
              },
            });

            await delay(500);

            setDocumentState((prev) => ({
              ...prev,
              pageSummaries: prev.pageSummaries.map((s, i) =>
                i === index
                  ? { ...s, imageUrl: key, isGeneratingImage: false }
                  : s
              ),
            }));

            completedCount++;

            if (
              completedCount % 3 === 0 ||
              completedCount + failedCount === summariesToProcess.length
            ) {
              toast.success(
                `Progress: ${completedCount}/${summariesToProcess.length} images generated`,
                {
                  description: "Image generation is in progress...",
                  duration: 3000,
                }
              );
            }
          } catch (error) {
            console.error(
              `Error generating/uploading image for page ${index + 1}:`,
              error
            );
            failedCount++;

            setDocumentState((prev) => ({
              ...prev,
              pageSummaries: prev.pageSummaries.map((s, i) =>
                i === index ? { ...s, isGeneratingImage: false } : s
              ),
            }));
          }
        })
      );
    }

    if (failedCount > 0) {
      toast.error(`Image generation completed with errors`, {
        description: `Generated ${completedCount} images, ${failedCount} failed.`,
      });
    } else {
      toast.success("All images generated", {
        description: `Successfully generated ${completedCount} images.`,
      });
    }
  }, [documentState.pageSummaries, updateDocumentState]);

  const handleUploadSlides = useCallback(async () => {
    if (!bookId) {
      toast.error("Book not found", {
        description: "Please ensure the book has been created first.",
      });
      return;
    }

    updateLoadingState({ isUploading: true });

    try {
      const deleteResult = await deleteSlidesByBook(client, bookId);
      if (!deleteResult.success) {
        throw new Error(`Deletion error: ${deleteResult.error}`);
      }

      const uploadResult = await uploadSlides(
        client,
        bookId,
        documentState.pageSummaries
      );

      if (uploadResult.success) {
        toast.success("Slides replaced successfully!", {
          description: `${uploadResult.uploadedCount} slides uploaded.`,
        });
      } else {
        throw new Error(`Upload error: ${uploadResult.error}`);
      }
    } catch (error: any) {
      console.log(
        "Failed to replace slides: Delete or upload actions issue",
        error
      );
    } finally {
      router.push("/books");
      updateLoadingState({ isUploading: false });
    }
  }, [bookId, client, documentState.pageSummaries, router, updateLoadingState]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Render content based on state
  const renderContent = () => {
    if (clientLoading) {
      return (
        <div className="md:col-span-3 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-primary border-solid rounded-full animate-spin opacity-30"></div>
              <div className="absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-4 border-4 border-primary border-dotted rounded-full animate-spin animate-delay"></div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Connecting to Server</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait while we establish a connection...
            </p>
          </div>
        </div>
      );
    }

    if (loadingState.isLoadingData) {
      return (
        <div className="md:col-span-3 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-primary border-solid rounded-full animate-spin opacity-30"></div>
              <div className="absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-4 border-4 border-primary border-dotted rounded-full animate-spin animate-delay"></div>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Loading Book Data</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait while we load your book content...
            </p>
          </div>
        </div>
      );
    }

    const showDocumentUploader =
      documentState.pageSummaries.length === 0 &&
      !documentState.startedFromScratch;

    return (
      <>
        {showDocumentUploader ? (
          <div className="md:col-span-3 border rounded-lg p-4 overflow-auto">
            <DocumentUploader
              onDocumentProcessed={handleDocumentProcessed}
              onProcessingStateChange={(isProcessing) =>
                updateLoadingState({ isProcessing })
              }
              onError={(errorMsg) => {
                updateProcessingState({ error: errorMsg });
                if (errorMsg) {
                  toast.error("Error processing document", {
                    description: errorMsg,
                  });
                }
              }}
              onStartFromScratch={handleStartFromScratch}
            />
          </div>
        ) : (
          <>
            {/* Left sidebar - Pages list */}
            <div className="md:col-span-1 border rounded-lg p-4 overflow-auto">
              {!documentState.startedFromScratch ? (
                <Tabs
                  value={documentState.viewMode}
                  onValueChange={(value) => {
                    updateDocumentState({
                      viewMode: value as "pages" | "summaries",
                      selectedPageIndex: 0,
                    });
                  }}
                  className="mb-4"
                >
                  <TabsList className="w-full">
                    {documentState.pages.length > 0 && (
                      <TabsTrigger value="pages" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Pages
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="summaries" className="flex-1">
                      <AlignLeft className="mr-2 h-4 w-4" />
                      Summarized Pages
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              ) : (
                <h3 className="text-lg font-medium mb-4">Summarized Pages</h3>
              )}

              {documentState.viewMode === "pages" &&
              !documentState.startedFromScratch ? (
                <PagesList
                  pages={documentState.pages}
                  fileName={documentState.fileName}
                  fileType={documentState.fileType || "word"}
                  selectedPageIndex={documentState.selectedPageIndex}
                  onSelectPage={handlePageSelect}
                  onSummarizeAllPages={handleSummarizeAllPages}
                />
              ) : (
                <SummarizedPagesList
                  pageSummaries={documentState.pageSummaries}
                  fileName={documentState.fileName}
                  fileType={documentState.fileType || "word"}
                  selectedPageIndex={documentState.selectedPageIndex}
                  onSelectPage={handlePageSelect}
                  onReorderPages={handleReorderPages}
                  onAddNewPage={handleAddNewPage}
                  onDeletePage={handleDeletePage}
                  onGenerateAllImages={handleGenerateAllImages}
                  onUploadSlides={handleUploadSlides}
                  summarizingPageIndices={
                    processingState.summarizingPageIndices
                  }
                />
              )}
            </div>

            {/* Right content area - Page/Summary Viewer */}
            <div className="md:col-span-2 border rounded-lg p-4 overflow-auto">
              {documentState.viewMode === "pages" &&
              !documentState.startedFromScratch ? (
                <PageViewer
                  page={documentState.pages[documentState.selectedPageIndex]}
                  pageIndex={documentState.selectedPageIndex}
                  fileName={documentState.fileName}
                  onGenerateSummary={handleGenerateSummary}
                  isSummarizing={processingState.summarizingPageIndices.has(
                    documentState.selectedPageIndex
                  )}
                />
              ) : documentState.pageSummaries.length > 0 ? (
                <SummaryViewer
                  pageSummary={
                    documentState.pageSummaries[documentState.selectedPageIndex]
                  }
                  pageIndex={documentState.selectedPageIndex}
                  bookInfo={bookInfo}
                  onUpdateSummary={handleSummaryUpdate}
                  onImageGenerationStart={handleImageGenerationStart}
                  onImageGenerationComplete={handleImageGenerationComplete}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <AlignLeft className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No pages yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Click the "Add New Page" button to create your first summary
                    page.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-120px)] min-h-[600px]">
      {renderContent()}
    </div>
  );
}
