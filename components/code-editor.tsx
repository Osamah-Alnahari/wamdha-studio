"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function CodeEditor({ value, onChange, language = "html", height = "300px" }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<any>(null)
  const editorInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load Monaco Editor dynamically
    import("monaco-editor")
      .then((monaco) => {
        monacoRef.current = monaco

        if (editorRef.current && !editorInstanceRef.current) {
          // Configure Monaco
          monaco.editor.defineTheme("customTheme", {
            base: "vs",
            inherit: true,
            rules: [],
            colors: {
              "editor.background": "#f9fafb",
            },
          })

          // Create editor instance
          editorInstanceRef.current = monaco.editor.create(editorRef.current, {
            value,
            language,
            theme: "customTheme",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            automaticLayout: true,
          })

          // Set up change event handler
          editorInstanceRef.current.onDidChangeModelContent(() => {
            onChange(editorInstanceRef.current.getValue())
          })

          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error("Failed to load Monaco Editor:", err)
        setError("Failed to load code editor. Using fallback textarea.")
        setIsLoading(false)
      })

    // Cleanup
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose()
        editorInstanceRef.current = null
      }
    }
  }, [])

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(value)
    }
  }, [value])

  // Fallback textarea if Monaco fails to load
  if (error) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full min-h-[300px] font-mono text-sm p-4 border rounded-md"
        style={{ height }}
      />
    )
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={editorRef} className="w-full h-full border rounded-md overflow-hidden" />
    </div>
  )
}
