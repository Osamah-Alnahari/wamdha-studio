"use client"

interface FallbackEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
}

export function FallbackEditor({ value, onChange, height = "300px" }: FallbackEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full font-mono text-sm p-4 border rounded-md"
      style={{ height }}
      spellCheck="false"
    />
  )
}
