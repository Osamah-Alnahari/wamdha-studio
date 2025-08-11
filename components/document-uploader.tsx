"use client";

import { useDropzone } from "react-dropzone";
import { Upload, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { processDocument } from "@/lib/document-processor";
import { DocumentUploaderProps } from "@/types";

export function DocumentUploader({
  onDocumentProcessed,
  onProcessingStateChange,
  onError,
  onStartFromScratch,
}: DocumentUploaderProps) {
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

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
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
    </div>
  );
}
