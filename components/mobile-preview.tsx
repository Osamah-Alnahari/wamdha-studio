"use client"

interface MobilePreviewProps {
  title: string
  content: string
  imageUrl?: string
  imagePosition?: "top" | "bottom"
  bookTitle: string
  author: string
  description: string
}

export function MobilePreview({
  title,
  content,
  imageUrl,
  imagePosition = "bottom",
  bookTitle,
  author,
  description,
}: MobilePreviewProps) {
  // Current time for the status bar
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`

  // Ensure all text props are strings with fallbacks
  const safeTitle = typeof title === "string" ? title : "Title"
  const safeContent = typeof content === "string" ? content : "No content available."
  const safeBookTitle = typeof bookTitle === "string" ? bookTitle : "Book Title"
  const safeAuthor = typeof author === "string" ? author : "Author"
  const safeDescription = typeof description === "string" ? description : ""

  return (
    <div className="flex justify-center py-4">
      {/* iPhone 14 frame */}
      <div className="w-full max-w-[390px] border-[12px] border-gray-800 rounded-[50px] overflow-hidden shadow-xl bg-white relative mobile-preview-container">
        {/* Dynamic Island */}
        <div className="h-[34px] bg-black flex justify-center items-center relative">
          <div className="w-[126px] h-[34px] bg-black rounded-b-[18px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>

        {/* Status bar */}
        <div className="h-6 bg-white flex justify-between items-center px-6 text-xs font-medium text-black">
          <div>{formattedTime}</div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2.5 bg-current rounded-sm"></div>
            <div className="w-3 h-2.5 bg-current rounded-sm"></div>
            <div className="w-2 h-2.5 bg-current rounded-sm"></div>
            <div className="w-4 h-2.5 bg-current rounded-full"></div>
          </div>
        </div>

        {/* Phone screen */}
        <div className="h-[720px] overflow-y-auto bg-white text-black">
          {/* Mobile app header */}
          <div className="sticky top-0 bg-white border-b p-4 z-10 shadow-sm">
            <h1 className="text-lg font-bold truncate text-black">{safeBookTitle}</h1>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 bg-white">
            {/* Summary title */}
            <h2 className="text-xl font-semibold text-black">{safeTitle}</h2>

            {/* Image at top position (below title) */}
            {imageUrl && imagePosition === "top" && (
              <div className="rounded-lg overflow-hidden shadow-md transition-all duration-500 transform">
                <img src={imageUrl || "/placeholder.svg"} alt={safeTitle} className="w-full h-auto object-cover" />
              </div>
            )}

            {/* Summary content */}
            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{safeContent}</div>

            {/* Image at bottom position (below content) */}
            {imageUrl && imagePosition === "bottom" && (
              <div className="rounded-lg overflow-hidden shadow-md mt-4 transition-all duration-500 transform">
                <img src={imageUrl || "/placeholder.svg"} alt={safeTitle} className="w-full h-auto object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div className="h-8 bg-white flex justify-center items-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
