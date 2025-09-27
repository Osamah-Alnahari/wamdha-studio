"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
  fileName?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  title,
  code,
  language = "tsx",
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative rounded-lg border bg-muted/50">
      {/* Header */}
      {(title || fileName) && (
        <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
            )}
            {fileName && (
              <span className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded">
                {fileName}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        {!title && !fileName && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
        <pre className="overflow-x-auto p-4 text-sm bg-background/50">
          <code className={`language-${language} text-foreground`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};
