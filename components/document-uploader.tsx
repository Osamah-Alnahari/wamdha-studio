"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { processDocument } from "@/lib/document-processor";
import { DocumentUploaderProps } from "@/types";
import { uploadBookFile, validateFile } from "@/lib/services";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

export function DocumentUploader({
  onDocumentProcessed,
  onProcessingStateChange,
  onError,
  onStartFromScratch,
  bookId,
}: DocumentUploaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/msword": [".doc"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      onProcessingStateChange(true);
      onError(null);

      // All files are treated as Word documents now
      const fileType = "word";

      try {
        const result = await processDocument(file);

        if (result.length === 0) {
          onError("No pages could be extracted from the document");
        } else {
          onDocumentProcessed(result, file.name, fileType);
        }
      } catch (err) {
        console.error("Error processing document:", err);
        onError(
          err instanceof Error ? err.message : "Failed to process document"
        );
      } finally {
        onProcessingStateChange(false);
      }
    },
  });

  // Handle direct S3 upload for books
  const handleS3UploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleS3FileSelected: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    const file = e.target.files?.[0];
    // Reset input so selecting the same file again triggers change
    if (e.target) e.target.value = "";
    if (!file) return;

    console.log("S3 upload started for file:", file.name);

    try {
      if (!user?.userId) {
        console.error("User not authenticated:", user);
        onError("Please sign in to upload a book.");
        return;
      }

      console.log("User authenticated:", {
        userId: user.userId,
        email: user.email,
      });

      onError(null);
      onProcessingStateChange(true);

      // Validate and prepare identifiers
      validateFile(file, 25); // allow up to 25MB by default
      // Use the actual book ID from URL, or generate a new one if not provided
      const actualBookId = bookId || uuidv4();
      const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "");

      console.log("Calling uploadBookFile with:", {
        userId: user.userId,
        bookId: actualBookId,
        titleWithoutExt,
        fileSize: file.size,
      });

      const result = await uploadBookFile(
        file,
        user.userId,
        actualBookId,
        titleWithoutExt,
        {
          contentType: file.type,
        }
      );

      console.log("Upload successful:", result);

      // Show confirmation dialog
      setDialogOpen(true);
    } catch (err) {
      console.error("S3 upload error:", err);
      onError(err instanceof Error ? err.message : "Failed to upload book");
    } finally {
      onProcessingStateChange(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      {/* Start from scratch - LEFT */}
      <Card className="border-dashed border-primary/50 hover:border-primary transition-colors h-full">
        <div
          className="flex flex-col items-center justify-center rounded-lg p-8 text-center cursor-pointer h-full"
          onClick={onStartFromScratch}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Start from scratch</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your own summaries without uploading a document
          </p>
          <Button
            className="mt-6"
            variant="default"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onStartFromScratch();
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Create New Summaries
          </Button>
        </div>
      </Card>

      {/* Drag & drop - RIGHT */}
      <Card className="border-dashed border-primary/50 hover:border-primary transition-colors h-full">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center rounded-lg p-8 text-center h-full cursor-pointer ${
            isDragActive ? "bg-primary/5" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            Drag & drop your document
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Or click to browse files (DOC and DOCX files are supported)
          </p>
          <Button className="mt-6" variant="outline">
            Select File
          </Button>
        </div>
      </Card>

      {/* Upload Book to S3 - MIDDLE/RIGHT */}
      <Card className="border-dashed border-primary/50 hover:border-primary transition-colors h-full">
        <div className="flex flex-col items-center justify-center rounded-lg p-8 text-center h-full">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Upload book to S3</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We’ll upload your DOC/DOCX to our storage and notify you when the
            summaries are ready.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleS3FileSelected}
          />
          <Button
            className="mt-6"
            variant="secondary"
            onClick={handleS3UploadClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Book to S3
          </Button>
        </div>
      </Card>

      {/* Post-upload dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          // Redirect to books page when dialog is closed
          if (!open) {
            router.push("/books");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We've received your book</DialogTitle>
            <DialogDescription>
              We will send you an email once your summaries are done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => router.push("/books")}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
