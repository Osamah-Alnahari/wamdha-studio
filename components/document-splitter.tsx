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
import { summarizeText as apiSummarizeText } from "@/lib/services/ai.service";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { getBookContent, getBookById } from "@/lib/services";
import { FileText, AlignLeft } from "lucide-react";

import { DocumentSplitterProps, BookInfo, PageSummary } from "@/types";
import {
  useDocumentState,
  useBookInfo,
  useLoadingState,
  useProcessingState,
  useDocumentActions,
} from "@/stores/document-store";

export function DocumentSplitter({ bookId }: DocumentSplitterProps) {
  const { client, isLoading: clientLoading } = useAmplifyClient();
  const router = useRouter();

  // Get state from document store
  const documentState = useDocumentState();
  const bookInfo = useBookInfo();
  const loadingState = useLoadingState();
  const processingState = useProcessingState();

  // Get actions from document store
  const {
    updateDocumentState,
    updateBookInfo,
    updateLoadingState,
    updateProcessingState,
    setSelectedPage,
    addPageSummary,
    updatePageSummary,
    deletePageSummary,
    reorderPageSummaries,
  } = useDocumentActions();

  // Refs for tracking operations
  const abortControllerRef = useRef<AbortController | null>(null);

  const sanitizeSummary = useCallback(
    (summary: Partial<PageSummary>): PageSummary => ({
      title:
        typeof summary.title === "string" && summary.title.trim()
          ? summary.title
          : "Untitled Summary",
      content: typeof summary.content === "string" ? summary.content : "",
      imageUrl: summary.imageUrl,
      localImageUrl: summary.localImageUrl,
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
        const book = await getBookById(client, bookId);

        if (book) {
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

          updateBookInfo(newBookInfo);
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
  }, [
    bookId,
    client,
    clientLoading,
    updateDocumentState,
    updateLoadingState,
    updateBookInfo,
  ]);

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
        setSelectedPage(index);
      } else {
        console.warn(`Invalid page index: ${index}, max: ${maxIndex}`);
        setSelectedPage(0);
      }
    },
    [
      documentState.viewMode,
      documentState.pages.length,
      documentState.pageSummaries.length,
      setSelectedPage,
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
        updatePageSummary(sanitizedSummary, pageIndex);
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
    [
      documentState.pageSummaries.length,
      sanitizeSummary,
      updateLoadingState,
      updatePageSummary,
    ]
  );

  const handleImageGenerationStart = useCallback(
    (pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= documentState.pageSummaries.length) {
        console.error("Invalid page index for image generation:", pageIndex);
        return;
      }

      const currentSummary = documentState.pageSummaries[pageIndex];
      const updatedSummary = { ...currentSummary, isGeneratingImage: true };
      updatePageSummary(updatedSummary, pageIndex);
    },
    [documentState.pageSummaries.length, updatePageSummary]
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
        const currentSummary = documentState.pageSummaries[pageIndex];
        const updatedSummary = {
          ...currentSummary,
          imageUrl,
          isGeneratingImage: false,
        };
        updatePageSummary(updatedSummary, pageIndex);
      } catch (error) {
        console.error(
          `Error completing image generation for page ${pageIndex + 1}:`,
          error
        );

        const currentSummary = documentState.pageSummaries[pageIndex];
        const updatedSummary = { ...currentSummary, isGeneratingImage: false };
        updatePageSummary(updatedSummary, pageIndex);

        toast.error("Error processing generated image", {
          description: "There was a problem processing the generated image.",
        });
      }
    },
    [documentState.pageSummaries.length, updatePageSummary]
  );

  // Summary generation handlers
  const handleGenerateSummary = useCallback(
    (pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= documentState.pages.length) return;

      return new Promise<void>(async (resolve, reject) => {
        try {
          updateProcessingState({
            summarizingPageIndices: new Set([
              ...processingState.summarizingPageIndices,
              pageIndex,
            ]),
          });

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

          const updatedSummary = {
            title: validatedTitle,
            content: validatedSummary,
            imageUrl: undefined,
            imagePosition: "bottom" as const,
            isLoading: false,
            isGeneratingImage: false,
          };

          updatePageSummary(updatedSummary, pageIndex);

          toast.success("Summary generated", {
            description: `Summary for page ${pageIndex + 1} has been created.`,
          });

          updateProcessingState({
            summarizingPageIndices: new Set(
              [...processingState.summarizingPageIndices].filter(
                (i) => i !== pageIndex
              )
            ),
          });

          resolve();
        } catch (error) {
          console.error("Error generating summary:", error);

          updateProcessingState({
            summarizingPageIndices: new Set(
              [...processingState.summarizingPageIndices].filter(
                (i) => i !== pageIndex
              )
            ),
          });

          toast.error("Failed to generate summary", {
            description:
              "There was an error generating the summary. Please try again.",
          });
          reject(error);
        }
      });
    },
    [
      documentState.pages,
      updatePageSummary,
      updateProcessingState,
      processingState.summarizingPageIndices,
    ]
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

      updateProcessingState({
        summarizingPageIndices: new Set([
          ...processingState.summarizingPageIndices,
          ...batch,
        ]),
      });

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

            const updatedSummary = {
              title: validatedTitle,
              content: validatedSummary,
              imageUrl: undefined,
              imagePosition: "bottom" as const,
              isLoading: false,
              isGeneratingImage: false,
            };

            updatePageSummary(updatedSummary, pageIndex);

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
            updateProcessingState({
              summarizingPageIndices: new Set(
                [...processingState.summarizingPageIndices].filter(
                  (i) => i !== pageIndex
                )
              ),
            });
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
    processingState.summarizingPageIndices,
    updatePageSummary,
  ]);

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
                <SummarizedPagesList bookId={bookId} />
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
