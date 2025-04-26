"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface SimpleCodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function SimpleCodeEditor({ value, onChange, height = "300px" }: SimpleCodeEditorProps) {
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="relative w-full border rounded-md overflow-hidden" style={{ height }}>
      <textarea
        value={internalValue}
        onChange={handleChange}
        className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        spellCheck="false"
        style={{ height }}
      />
    </div>
  )
}
