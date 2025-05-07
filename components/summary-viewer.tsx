"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Save,
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
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { fetchImageUrl } from "@/lib/utils";
import FetchKeyImage from "./FetchKeyImage";
import { generateImageFromPrompt } from "@/lib/api-client";
import { Input } from "./ui/input";

interface PageSummary {
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: "top" | "bottom";
  isGeneratingImage?: boolean;
}

interface BookInfo {
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
}

interface SummaryViewerProps {
  pageSummary: PageSummary;
  pageIndex: number;
  bookInfo: BookInfo;
  onUpdateSummary: (summary: PageSummary) => void;
  onImageGenerationStart?: (pageIndex: number) => void;
  onImageGenerationComplete?: (pageIndex: number, imageUrl: string) => void;
}

export function SummaryViewer({
  pageSummary,
  pageIndex,
  bookInfo,
  onUpdateSummary,
  onImageGenerationStart,
  onImageGenerationComplete,
}: SummaryViewerProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState(pageSummary.title);
  const [content, setContent] = useState(pageSummary.content);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    pageSummary.imageUrl
  );

  const [imagePosition, setImagePosition] = useState<"top" | "bottom">(
    pageSummary.imagePosition || "bottom"
  );
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(
    undefined
  );
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDisplayUrl, setImageDisplayUrl] = useState<string | undefined>(
    pageSummary.imageUrl
  );

  // Store the current page index to track page changes
  const currentPageIndexRef = useRef<number>(pageIndex);

  // Pending changes queue
  const pendingChangesRef = useRef<PageSummary>({
    title: pageSummary.title,
    content: pageSummary.content,
    imageUrl: pageSummary.imageUrl,
    imagePosition: pageSummary.imagePosition || "bottom",
    isGeneratingImage: !!pageSummary.isGeneratingImage,
  });

  // Save timeout reference
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save lock to prevent concurrent saves
  const isSavingRef = useRef(false);
  const [isSaving, setIsSaving] = useState(false);

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

  // Update local state when the selected page changes
  useEffect(() => {
    // Update the ref to track page changes
    currentPageIndexRef.current = pageIndex;
    setLocalImageUrl(undefined);
    if (pageSummary) {
      setTitle(
        typeof pageSummary.title === "string"
          ? pageSummary.title
          : `Summary ${pageIndex + 1}`
      );
      setContent(
        typeof pageSummary.content === "string" ? pageSummary.content : ""
      );
      setImageUrl(pageSummary.imageUrl);
      setImagePosition(pageSummary.imagePosition || "bottom");
      setIsGeneratingImage(!!pageSummary.isGeneratingImage);
      setHasChanges(false);

      // Reset pending changes reference
      pendingChangesRef.current = {
        title:
          typeof pageSummary.title === "string"
            ? pageSummary.title
            : `Summary ${pageIndex + 1}`,
        content:
          typeof pageSummary.content === "string" ? pageSummary.content : "",
        imageUrl: pageSummary.imageUrl,
        imagePosition: pageSummary.imagePosition || "bottom",
        isGeneratingImage: !!pageSummary.isGeneratingImage,
      };
    }

    // Clear any pending save timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    // Load display image
    const loadDisplayImage = async () => {
      if (pageSummary.imageUrl) {
        try {
          const displayUrl = await fetchImageUrl(pageSummary.imageUrl);
          setImageDisplayUrl(displayUrl);
        } catch (err) {
          console.error("Failed to fetch display image:", err);
          setImageDisplayUrl(undefined); // or a fallback image URL
        }
      } else {
        setImageDisplayUrl(undefined);
      }
    };
    loadDisplayImage();
  }, [pageSummary, pageIndex, pageSummary?.imageUrl]);

  // Function to actually perform the save
  const performSave = async () => {
    if (isSavingRef.current) {
      // If already saving, schedule another save after a delay
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(performSave, 300);
      return;
    }

    try {
      isSavingRef.current = true;
      setIsSaving(true);

      // Create a copy of the pending changes
      const summaryToSave = { ...pendingChangesRef.current };

      // Sanitize the data
      const sanitizedSummary: PageSummary = {
        title:
          typeof summaryToSave.title === "string" && summaryToSave.title.trim()
            ? summaryToSave.title
            : "Untitled Summary",
        content: summaryToSave.content,
        imageUrl: summaryToSave.imageUrl,
        imagePosition: summaryToSave.imagePosition,
        isGeneratingImage: summaryToSave.isGeneratingImage,
      };

      // Call the update function provided by parent
      await onUpdateSummary(sanitizedSummary);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = (changes: Partial<PageSummary>) => {
    // Update pending changes
    pendingChangesRef.current = {
      ...pendingChangesRef.current,
      ...changes,
    };

    setHasChanges(true);

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set a new timeout
    saveTimeoutRef.current = setTimeout(performSave, 500);
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave({ title: newTitle });
  };

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedSave({ content: newContent });
  };

  // Handle image position change
  const handleImagePositionChange = (checked: boolean) => {
    const newPosition = checked ? "top" : "bottom";
    setImagePosition(newPosition);
    debouncedSave({ imagePosition: newPosition });
  };

  // Manual save function for immediate changes that should be saved right away
  const handleImmediateSave = (
    changes: Partial<PageSummary>,
    targetPageIndex?: number
  ) => {
    // If targetPageIndex is provided and doesn't match current page,
    // notify parent to update the correct page instead of local state
    if (
      targetPageIndex !== undefined &&
      targetPageIndex !== currentPageIndexRef.current
    ) {
      // Create a merged summary for the target page
      const targetPageSummary: PageSummary = {
        title: pendingChangesRef.current.title,
        content: pendingChangesRef.current.content,
        imageUrl: changes.imageUrl || pendingChangesRef.current.imageUrl,
        imagePosition:
          changes.imagePosition || pendingChangesRef.current.imagePosition,
        isGeneratingImage:
          changes.isGeneratingImage !== undefined
            ? changes.isGeneratingImage
            : pendingChangesRef.current.isGeneratingImage,
      };

      // Directly notify parent component to update the specific page
      if (onImageGenerationComplete && changes.imageUrl) {
        onImageGenerationComplete(targetPageIndex, changes.imageUrl);
      } else {
        // Update any other changes for the specified page index
        // This would need a more general handler in the parent component
        console.log(
          `Changes need to be applied to page ${
            targetPageIndex + 1
          } instead of current page`
        );
      }
      return;
    }

    // Update pending changes for current page
    pendingChangesRef.current = {
      ...pendingChangesRef.current,
      ...changes,
    };

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    // Perform save immediately
    performSave();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Store the page index at the time of upload initiation
    const targetPageIndex = currentPageIndexRef.current;

    if (!file) return;

    try {
      // Show loading state to user
      toast.loading("Uploading image...", { id: "uploadToast" });

      const uniqueId = uuidv4();
      const extension = file.name.split(".").pop();
      const key = `public/${uniqueId}.${extension}`;

      // Upload and wait for complete response
      await uploadData({
        path: key,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes = 100 }) => {
            const percent = Math.round((transferredBytes / totalBytes) * 100);
            console.log(`Upload progress: ${percent}%`);
          },
        },
      });

      // Create temp URL for preview
      const tempUrl = URL.createObjectURL(file);

      // Check if we're still on the same page
      if (targetPageIndex === currentPageIndexRef.current) {
        setLocalImageUrl(tempUrl);
        setImageUrl(key);
        setHasChanges(true);
      }

      // ensure the image became available in s3
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save image URL immediately to the correct page
      handleImmediateSave({ imageUrl: key }, targetPageIndex);

      // Update the toast
      toast.success("Cover image uploaded successfully!", {
        id: "uploadToast",
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload cover image.", { id: "uploadToast" });
    }
  };

  const processImageFile = (file: File) => {
    // Store the page index at the time of processing
    const targetPageIndex = currentPageIndexRef.current;

    const reader = new FileReader();
    reader.onload = (event) => {
      const uploadedImageUrl = event.target?.result as string;

      // Only update UI if we're still on the same page
      if (targetPageIndex === currentPageIndexRef.current) {
        setImageUrl(uploadedImageUrl);
        setHasChanges(true);
      }

      // Save to the correct page regardless of current view
      debouncedSave({ imageUrl: uploadedImageUrl });
    };
    // triggers the onload event
    reader.readAsDataURL(file);
  };

  // Modify the handleGenerateImage function to be more robust
  const handleGenerateImage = () => {
    // Don't allow generating a new image if one is already being generated
    if (isGeneratingImage) return;

    // Store the current page index to ensure the image is applied to the correct page
    const targetPageIndex = currentPageIndexRef.current;

    // Update UI state if still on the same page
    setIsGeneratingImage(true);
    debouncedSave({ isGeneratingImage: true });

    // Notify parent component that image generation has started
    if (onImageGenerationStart) {
      onImageGenerationStart(targetPageIndex);
    }

    // Create an abort controller to handle cancellation
    const abortController = new AbortController();
    const signal = abortController.signal;

    // In a real app, this would call an AI image generation API
    // const generateImagePromise = new Promise<string>((resolve, reject) => {
    //   try {
    //     if (signal.aborted) {
    //       reject(new Error("Image generation was cancelled"));
    //       return;
    //     }
    //     // Generate a random placeholder image
    //     const width = 600;
    //     const height = 400;
    //     const randomId = Math.floor(Math.random() * 1000);
    //     const generatedImageUrl = `https://picsum.photos/seed/${randomId}/${width}/${height}`;

    //     resolve(generatedImageUrl);
    //   } catch (error) {
    //     reject(error);
    //   }
    //   // Clean up the timeout if aborted
    //   signal.addEventListener("abort", () => {
    //     reject(new Error("Image generation was cancelled"));
    //   });
    // });

    // Call our api
    const generateImagePromise = (async () => {
      if (signal.aborted) {
        throw new Error("Image generation was cancelled");
      }
      console.log("Prompt:", pageSummary.title);
      const { imageUrl } = await generateImageFromPrompt(pageSummary.title);
      return imageUrl;
    })();
    generateImagePromise
      .then(async (generatedImageUrl) => {
        // Reset generation status on the original page
        if (currentPageIndexRef.current === targetPageIndex) {
          setIsGeneratingImage(false);
        }

        // Always update the state for the target page
        if (onImageGenerationStart) {
          // Use parent component's handler to update the correct page's state
          debouncedSave({ isGeneratingImage: false });
        }

        // Upload generated image to S3
        try {
          const response = await fetch(generatedImageUrl);
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
                console.log(`Generated image upload progress: ${percent}%`);
              },
            },
          });

          // Always notify parent to update the correct page,
          // regardless of which page is currently being viewed
          if (onImageGenerationComplete) {
            onImageGenerationComplete(targetPageIndex, key);
          }

          // Only update local UI state if we're still on the same page
          if (currentPageIndexRef.current === targetPageIndex) {
            setLocalImageUrl(URL.createObjectURL(file));
            setImageUrl(key);
          }

          // Save image URL immediately to the correct page
          handleImmediateSave({ imageUrl: key }, targetPageIndex);

          toast.success("Generated image uploaded successfully!");
        } catch (uploadError) {
          console.error("Upload of generated image failed:", uploadError);
          toast.error("Failed to upload generated image.");
        }

        toast.success("Image generated", {
          description: `Image for page ${
            targetPageIndex + 1
          } has been generated.`,
        });
      })
      .catch((error) => {
        console.error("Image generation failed:", error);

        // Reset generation state for the original page
        if (currentPageIndexRef.current === targetPageIndex) {
          setIsGeneratingImage(false);
        }

        // Always update the target page's state
        debouncedSave({ isGeneratingImage: false });

        if (!signal.aborted) {
          toast.error("Failed to generate image", {
            description: "Please try again later.",
          });
        }
      });

    // Return the abort controller so it can be used for cleanup
    return abortController;
  };

  // Add a useEffect for cleanup
  useEffect(() => {
    const abortController: AbortController | null = null;

    return () => {
      // Clean up any pending image generation when component unmounts
      if (abortController) {
        abortController.abort();
      }
      // Clean up any pending save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);

        // Perform a final save if there are pending changes
        if (hasChanges) {
          performSave();
        }
      }
    };
  }, [hasChanges]);

  const handleRemoveImage = () => {
    setImageUrl(undefined);
    setHasChanges(true);
    handleImmediateSave({ imageUrl: undefined });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

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
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "edit" | "preview")}
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

          {/* {viewMode === "edit" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          )} */}
        </div>
      </div>

      {viewMode === "edit" ? (
        <>
          <Card>
            {/* Disable it for now until it is enabled in the */}
            <CardHeader>
              <CardTitle className="text-base">Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={title}
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
                value={content}
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
                    isDragging
                      ? "border-primary bg-primary/5"
                      : imageUrl
                      ? ""
                      : "border-dashed"
                  )}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {imageUrl ? (
                    <div className="relative">
                      {/* Mobile-sized image preview container */}
                      <div className="mx-auto max-w-[366px] rounded-md overflow-hidden">
                        <FetchKeyImage
                          imageKey={localImageUrl || imageUrl}
                          tempUrl={localImageUrl !== undefined}
                          className="w-full h-auto object-cover"
                          alt="Summary illustration"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="p-8 flex flex-col items-center justify-center text-muted-foreground cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <p>
                        {isDragging
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
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
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
                    disabled={isGeneratingImage}
                    className="flex-1"
                  >
                    {isGeneratingImage ? (
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

                {imageUrl && (
                  <div className="flex items-center justify-between mt-4 p-3 border rounded-md bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {imagePosition === "top" ? (
                          <ArrowUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Image Position</p>
                        <p className="text-sm text-muted-foreground">
                          {imagePosition === "top"
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
                        checked={imagePosition === "top"}
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
          title={title}
          content={content}
          imageUrl={imageDisplayUrl}
          imagePosition={imagePosition}
          bookTitle={safeBookInfo.title}
          author={safeBookInfo.author}
          description={safeBookInfo.description}
        />
      )}
    </div>
  );
}
