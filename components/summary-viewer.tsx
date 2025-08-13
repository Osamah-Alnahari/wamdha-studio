"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  ImageIcon,
  Loader2,
  X,
  Smartphone,
  Edit,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MobilePreview } from "@/components/mobile-preview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/lib/services";
import { getFileUrl } from "@/lib/services";
import FetchKeyImage from "./FetchKeyImage";
import { generateImageFromPrompt } from "@/lib/services/ai.service";
import { Input } from "./ui/input";
import {
  useDocumentStore,
  useEditorState,
  useImageState,
  useLoadingState,
  useDocumentActions,
} from "@/stores/document-store";

import { PageSummary, BookInfo, SummaryViewerProps } from "@/types";

export function SummaryViewer({
  pageSummary,
  pageIndex,
  bookInfo,
  onUpdateSummary,
  onImageGenerationStart,
  onImageGenerationComplete,
}: SummaryViewerProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentPageIndexRef = useRef<number>(pageIndex);
  const pendingChangesRef = useRef<Map<number, PageSummary>>(new Map());
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  const saveOperationIdRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Use document store state and actions
  const editorState = useEditorState();
  const imageState = useImageState();
  const loadingState = useLoadingState();
  const {
    updateEditorState,
    updateImageState,
    updateLoadingState,
    updatePageSummary,
  } = useDocumentActions();

  // Ensure bookInfo properties are strings
  const safeBookInfo = {
    title:
      typeof bookInfo.title === "string" ? bookInfo.title : "Untitled Book",
    author:
      typeof bookInfo.author === "string" ? bookInfo.author : "Unknown Author",
    description:
      typeof bookInfo.description === "string" ? bookInfo.description : "",
    coverImageUrl: bookInfo.coverImageUrl,
    isOwnedByUser: !!bookInfo.isOwnedByUser,
  };

  const sanitizeSummary = useCallback(
    (summary: Partial<PageSummary>): PageSummary => ({
      title:
        typeof summary.title === "string" && summary.title.trim()
          ? summary.title
          : "Untitled Summary",
      content: typeof summary.content === "string" ? summary.content : "",
      imageUrl: summary.imageUrl,
      imagePosition: summary.imagePosition || "bottom",
      isGeneratingImage: !!summary.isGeneratingImage,
    }),
    []
  );

  const getPendingChanges = useCallback(
    (pageIdx: number): PageSummary => {
      const pending = pendingChangesRef.current.get(pageIdx);
      if (pending) {
        return { ...pending };
      }

      return {
        title:
          typeof pageSummary.title === "string"
            ? pageSummary.title
            : `Summary ${pageIdx + 1}`,
        content:
          typeof pageSummary.content === "string" ? pageSummary.content : "",
        imageUrl: pageSummary.imageUrl,
        localImageUrl: pageSummary.localImageUrl,
        imagePosition: pageSummary.imagePosition || "bottom",
        isGeneratingImage: !!pageSummary.isGeneratingImage,
      };
    },
    [pageSummary]
  );

  // Update local state when the selected page changes
  useEffect(() => {
    currentPageIndexRef.current = pageIndex;

    if (pageSummary) {
      updateEditorState({
        title:
          typeof pageSummary.title === "string"
            ? pageSummary.title
            : `Summary ${pageIndex + 1}`,
        content:
          typeof pageSummary.content === "string" ? pageSummary.content : "",
        imagePosition: pageSummary.imagePosition || "bottom",
      });

      updateImageState({
        imageUrl: pageSummary.imageUrl,
        localImageUrl: pageSummary.localImageUrl,
        imageDisplayUrl: pageSummary.localImageUrl || pageSummary.imageUrl,
      });

      updateLoadingState({
        isGeneratingImage: !!pageSummary.isGeneratingImage,
      });

      // Initialize pending changes for this page if not exists
      if (!pendingChangesRef.current.has(pageIndex)) {
        pendingChangesRef.current.set(pageIndex, {
          title:
            typeof pageSummary.title === "string"
              ? pageSummary.title
              : `Summary ${pageIndex + 1}`,
          content:
            typeof pageSummary.content === "string" ? pageSummary.content : "",
          imageUrl: pageSummary.imageUrl,
          localImageUrl: pageSummary.localImageUrl,
          imagePosition: pageSummary.imagePosition || "bottom",
          isGeneratingImage: !!pageSummary.isGeneratingImage,
        });
      }
    }

    // Clear any pending save timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    // Load display image only if we don't have a local image URL
    if (!pageSummary.localImageUrl) {
      const loadDisplayImage = async () => {
        if (pageSummary.imageUrl) {
          try {
            const displayUrl = await getFileUrl(pageSummary.imageUrl);
            updateImageState({ imageDisplayUrl: displayUrl });
          } catch (err) {
            console.error("Failed to fetch display image:", err);
            updateImageState({ imageDisplayUrl: undefined });
          }
        } else {
          updateImageState({ imageDisplayUrl: undefined });
        }
      };
      loadDisplayImage();
    }
  }, [
    pageSummary,
    pageIndex,
    pageSummary?.imageUrl,
    pageSummary?.localImageUrl,
    updateEditorState,
    updateImageState,
    updateLoadingState,
  ]);

  // Function to actually perform the save
  const performSave = useCallback(
    async (targetPageIndex?: number) => {
      const pageIdx = targetPageIndex ?? currentPageIndexRef.current;
      const operationId = ++saveOperationIdRef.current;

      if (isSavingRef.current) {
        setTimeout(() => {
          if (operationId === saveOperationIdRef.current) {
            performSave(targetPageIndex);
          }
        }, 100);
        return;
      }

      isSavingRef.current = true;
      updateLoadingState({ isSaving: true });

      try {
        const pendingChanges = getPendingChanges(pageIdx);
        const sanitizedSummary = sanitizeSummary(pendingChanges);

        // Use store action to update page summary
        updatePageSummary(sanitizedSummary, pageIdx);

        // Also call the original callback if provided (for backward compatibility)
        if (onUpdateSummary) {
          await onUpdateSummary(sanitizedSummary, pageIdx);
        }

        // Clear pending changes for this page after successful save
        pendingChangesRef.current.delete(pageIdx);
      } catch (error) {
        console.error("Failed to save changes:", error);
        toast.error("Failed to save changes. Please try again.");
      } finally {
        isSavingRef.current = false;
        updateLoadingState({ isSaving: false });
      }
    },
    [
      getPendingChanges,
      sanitizeSummary,
      updatePageSummary,
      onUpdateSummary,
      toast,
      updateLoadingState,
    ]
  );

  // Debounced save function
  const debouncedSave = useCallback(
    (changes: Partial<PageSummary>, targetPageIndex?: number) => {
      const pageIdx = targetPageIndex ?? currentPageIndexRef.current;

      // Get current pending changes and merge with new changes
      const currentPending = getPendingChanges(pageIdx);
      const updatedPending = { ...currentPending, ...changes };

      // Store updated pending changes
      pendingChangesRef.current.set(pageIdx, updatedPending);

      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout
      saveTimeoutRef.current = setTimeout(() => {
        performSave(pageIdx);
      }, 300);
    },
    [getPendingChanges, performSave]
  );

  // Immediate save function
  const handleImmediateSave = useCallback(
    async (changes: Partial<PageSummary>, targetPageIndex?: number) => {
      const pageIdx = targetPageIndex ?? currentPageIndexRef.current;

      // Merge changes into pending changes
      const currentPending = getPendingChanges(pageIdx);
      const updatedPending = { ...currentPending, ...changes };
      pendingChangesRef.current.set(pageIdx, updatedPending);

      // Clear any pending debounced save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }

      // Perform save immediately
      await performSave(pageIdx);
    },
    [getPendingChanges, performSave]
  );

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    updateEditorState({ title: newTitle });
    debouncedSave({ title: newTitle });
  };

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    updateEditorState({ content: newContent });
    debouncedSave({ content: newContent });
  };

  // Handle image position change
  const handleImagePositionChange = (checked: boolean) => {
    const newPosition = checked ? "top" : "bottom";
    updateEditorState({ imagePosition: newPosition });
    debouncedSave({ imagePosition: newPosition });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetPageIndex = currentPageIndexRef.current;

    if (!file) return;

    updateLoadingState({ isUploading: true });
    try {
      toast.loading("Uploading image...", { id: "uploadToast" });

      const result = await uploadFile(file, "public", {
        onProgress: ({ transferredBytes, totalBytes = 100 }) => {
          const percent = Math.round((transferredBytes / totalBytes) * 100);
          console.log(`Upload progress: ${percent}%`);
        },
      });

      // Create temp URL for preview
      const tempUrl = URL.createObjectURL(file);

      // Update UI if still on the same page
      if (targetPageIndex === currentPageIndexRef.current) {
        updateImageState({ localImageUrl: tempUrl, imageUrl: result.key });
      }

      // Ensure the image is available in S3
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save both S3 key and local URL immediately to the correct page
      await handleImmediateSave(
        {
          imageUrl: result.key,
          localImageUrl: tempUrl,
        },
        targetPageIndex
      );

      toast.success("Cover image uploaded successfully!", {
        id: "uploadToast",
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload cover image.", { id: "uploadToast" });
    } finally {
      updateLoadingState({ isUploading: false });
    }
  };

  const processImageFile = (file: File) => {
    const targetPageIndex = currentPageIndexRef.current;

    const reader = new FileReader();
    reader.onload = (event) => {
      const uploadedImageUrl = event.target?.result as string;

      // Only update UI if we're still on the same page
      if (targetPageIndex === currentPageIndexRef.current) {
        updateImageState({
          imageUrl: uploadedImageUrl,
          localImageUrl: uploadedImageUrl,
        });
      }

      // Save to the correct page with local URL
      debouncedSave(
        {
          imageUrl: uploadedImageUrl,
          localImageUrl: uploadedImageUrl,
        },
        targetPageIndex
      );
    };
    reader.readAsDataURL(file);
  };

  // Modify the handleGenerateImage function to be more robust
  const handleGenerateImage = () => {
    if (loadingState.isGeneratingImage) return;

    const targetPageIndex = currentPageIndexRef.current;

    // Update UI state if still on the same page
    updateLoadingState({ isGeneratingImage: true });
    debouncedSave({ isGeneratingImage: true }, targetPageIndex);

    // Notify parent component
    if (onImageGenerationStart) {
      onImageGenerationStart(targetPageIndex);
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const generateImagePromise = (async () => {
      if (signal.aborted) {
        throw new Error("Image generation was cancelled");
      }
      const { imageUrl } = await generateImageFromPrompt(pageSummary.title);
      return imageUrl;
    })();

    generateImagePromise
      .then(async (generatedImageUrl) => {
        const targetPageIdx = targetPageIndex;

        // Reset generation status on the original page
        if (currentPageIndexRef.current === targetPageIdx) {
          updateLoadingState({ isGeneratingImage: false });
        }

        // Update the state for the target page
        debouncedSave({ isGeneratingImage: false }, targetPageIdx);

        // Upload generated image to S3
        try {
          const response = await fetch(generatedImageUrl);
          const blob = await response.blob();
          const file = new File([blob], "generated-image.jpg", {
            type: blob.type,
          });

          const result = await uploadFile(file, "public", {
            onProgress: ({ transferredBytes, totalBytes = 100 }) => {
              const percent = Math.round((transferredBytes / totalBytes) * 100);
              console.log(`Generated image upload progress: ${percent}%`);
            },
          });

          // Notify parent to update the correct page
          if (onImageGenerationComplete) {
            onImageGenerationComplete(targetPageIdx, result.key);
          }

          // Create local URL once
          const localUrl = URL.createObjectURL(file);

          // Only update local UI state if we're still on the same page
          if (currentPageIndexRef.current === targetPageIdx) {
            updateImageState({
              localImageUrl: localUrl,
              imageUrl: result.key,
            });
          }

          // Save image URL immediately to the correct page
          await handleImmediateSave(
            {
              imageUrl: result.key,
              localImageUrl: localUrl,
            },
            targetPageIdx
          );

          toast.success("Generated image uploaded successfully!");
        } catch (uploadError) {
          console.error("Upload of generated image failed:", uploadError);
          toast.error("Failed to upload generated image.");
        }

        toast.success("Image generated", {
          description: `Image for page ${
            targetPageIdx + 1
          } has been generated.`,
        });
      })
      .catch((error) => {
        console.error("Image generation failed:", error);

        // Reset generation state for the original page
        if (currentPageIndexRef.current === targetPageIndex) {
          updateLoadingState({ isGeneratingImage: false });
        }

        // Always update the target page's state
        debouncedSave({ isGeneratingImage: false }, targetPageIndex);

        if (!signal.aborted) {
          toast.error("Failed to generate image", {
            description: "Please try again later.",
          });
        }
      });

    return abortController;
  };

  // Cleanup effect
  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      // Clean up any pending image generation when component unmounts
      if (abortController) {
        abortController.abort();
      }

      // Clean up any pending save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;

        // Perform a final save if there are pending changes for the current page
        const currentPageIdx = currentPageIndexRef.current;
        const pendingChanges = pendingChangesRef.current.get(currentPageIdx);

        if (pendingChanges && !isSavingRef.current) {
          // Use a synchronous approach for the final save to ensure it completes
          const finalSummary = sanitizeSummary(pendingChanges);
          updatePageSummary(finalSummary, currentPageIdx);
          if (onUpdateSummary) {
            onUpdateSummary(finalSummary, currentPageIdx);
          }
        }
      }
    };
  }, [sanitizeSummary, updatePageSummary, onUpdateSummary]);

  const handleRemoveImage = async () => {
    updateLoadingState({ isRemoving: true });
    try {
      updateImageState({ imageUrl: undefined, localImageUrl: undefined });
      await handleImmediateSave({
        imageUrl: undefined,
        localImageUrl: undefined,
      });
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Failed to remove image:", error);
      toast.error("Failed to remove image");
    } finally {
      updateLoadingState({ isRemoving: false });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateImageState({ isDragging: true });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateImageState({ isDragging: false });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateImageState({ isDragging: false });

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        processImageFile(file);
      } else {
        toast.error("Invalid file type", {
          description: "Please upload an image file.",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Page {pageIndex + 1} Summary</h2>
        <div className="flex items-center gap-2">
          <Tabs
            value={editorState.viewMode}
            onValueChange={(value) =>
              updateEditorState({ viewMode: value as "edit" | "preview" })
            }
          >
            <TabsList>
              <TabsTrigger value="edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {editorState.viewMode === "edit" ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={editorState.title}
                onChange={handleTitleChange}
                placeholder="Enter a title for this summary"
                className="mb-4"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editorState.content}
                onChange={handleContentChange}
                placeholder="Enter your summary here..."
                className="min-h-[250px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={cn(
                    "border rounded-md overflow-hidden transition-colors",
                    imageState.isDragging
                      ? "border-primary bg-primary/5"
                      : imageState.imageUrl
                      ? ""
                      : "border-dashed"
                  )}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {imageState.imageUrl ? (
                    <div className="relative">
                      {/* Mobile-sized image preview container */}
                      <div className="mx-auto max-w-[366px] rounded-md overflow-hidden">
                        <FetchKeyImage
                          imageKey={
                            imageState.localImageUrl || imageState.imageUrl
                          }
                          tempUrl={imageState.localImageUrl !== undefined}
                          className="w-full h-auto object-cover"
                          alt="Summary illustration"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                        disabled={loadingState.isRemoving}
                      >
                        {loadingState.isRemoving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="p-8 flex flex-col items-center justify-center text-muted-foreground cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <p>
                        {imageState.isDragging
                          ? "Drop image here"
                          : "Drag & drop an image or click to upload"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={triggerFileInput}
                    className="flex-1"
                    disabled={loadingState.isUploading}
                  >
                    {loadingState.isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={handleGenerateImage}
                    disabled={loadingState.isGeneratingImage}
                    className="flex-1"
                  >
                    {loadingState.isGeneratingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>

                {imageState.imageUrl && (
                  <div className="flex items-center justify-between mt-4 p-3 border rounded-md bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {editorState.imagePosition === "top" ? (
                          <ArrowUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Image Position</p>
                        <p className="text-sm text-muted-foreground">
                          {editorState.imagePosition === "top"
                            ? "Image shown below title"
                            : "Image shown below content"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="image-position" className="sr-only">
                        Image Position
                      </Label>
                      <Switch
                        id="image-position"
                        checked={editorState.imagePosition === "top"}
                        onCheckedChange={handleImagePositionChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <MobilePreview
          title={editorState.title}
          content={editorState.content}
          imageUrl={imageState.imageDisplayUrl}
          imagePosition={editorState.imagePosition}
          bookTitle={safeBookInfo.title}
          author={safeBookInfo.author}
          description={safeBookInfo.description}
        />
      )}
    </div>
  );
}
