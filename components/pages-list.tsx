"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface PagesListProps {
  pages: string[]
  fileName: string
  fileType: "word" | "pdf"
  selectedPageIndex: number
  onSelectPage: (index: number) => void
}

export function PagesList({ pages, fileName, fileType, selectedPageIndex, onSelectPage }: PagesListProps) {
  const { toast } = useToast()

  const downloadAllPages = () => {
    const zip = require("jszip")()
    const baseFileName = fileName.replace(/\.[^/.]+$/, "")
    const extension = "html"

    pages.forEach((page, index) => {
      zip.file(`${baseFileName}_page_${index + 1}.${extension}`, page)
    })

    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = `${baseFileName}_pages.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium truncate">{fileName}</h3>
        </div>
        <div className="flex space-x-2">
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">{pages.length} pages</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary uppercase">
            {fileType}
          </span>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={downloadAllPages}>
        <Download className="mr-2 h-4 w-4" />
        Download All Pages
      </Button>

      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium">Pages</h4>
        <div className="space-y-1 max-h-[calc(100vh-270px)] overflow-y-auto pr-2">
          {pages.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn("w-full justify-start", selectedPageIndex === index && "bg-muted")}
              onClick={() => onSelectPage(index)}
            >
              Page {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
