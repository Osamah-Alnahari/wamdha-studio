"use client"

import { useState } from "react"
import { Copy, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"

interface PageViewerProps {
  page: string
  pageIndex: number
  fileName: string
  onGenerateSummary?: () => void
}

export function PageViewer({ page, pageIndex, fileName, onGenerateSummary }: PageViewerProps) {
  const [editedPage, setEditedPage] = useState<string>(page)

  // Update edited page when page prop changes
  if (page !== editedPage && page !== "") {
    setEditedPage(page)
  }

  const copyPageContent = () => {
    navigator.clipboard.writeText(editedPage).then(() => {
      toast.success("Copied to clipboard", {
        description: `Page ${pageIndex + 1} content copied to clipboard`,
      })
    })
  }

  const handleCodeChange = (newCode: string) => {
    setEditedPage(newCode)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Page {pageIndex + 1}</h2>
        <div className="flex gap-2">
          {onGenerateSummary && (
            <Button variant="outline" size="sm" onClick={onGenerateSummary}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Summary
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={copyPageContent}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div
            className="prose max-w-none dark:prose-invert prose-img:rounded-lg overflow-auto border rounded-md p-4 min-h-[450px] max-h-[calc(100vh-220px)]"
            dangerouslySetInnerHTML={{
              __html: editedPage || '<p class="text-muted-foreground">No content found in this page.</p>',
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
