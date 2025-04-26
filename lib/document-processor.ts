import mammoth from "mammoth"

export async function processDocument(file: File): Promise<string[]> {
  // Only process Word documents now
  return processWordDocument(file)
}

async function processWordDocument(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      if (!event.target?.result) {
        reject(new Error("Failed to read file"))
        return
      }

      try {
        // Convert the Word document to HTML
        const arrayBuffer = event.target.result as ArrayBuffer
        const result = await mammoth.convertToHtml({
          arrayBuffer,
          preserveStyles: true, // Preserve styles to better detect page breaks
        })

        const html = result.value

        // Check if we got any content
        if (!html || html.trim().length === 0) {
          reject(new Error("No content could be extracted from the document"))
          return
        }

        // Split the HTML into pages
        const pages = splitWordDocIntoPages(html)

        // Verify we have valid pages
        if (pages.length === 0) {
          reject(new Error("Could not split the document into pages"))
          return
        }

        // Filter out any empty pages
        const validPages = pages.filter((page) => page.trim().length > 0)

        if (validPages.length === 0) {
          // If all pages were filtered out, return the original HTML as a single page
          resolve([html])
        } else {
          resolve(validPages)
        }
      } catch (error) {
        console.error("Error processing Word document:", error)
        reject(error instanceof Error ? error : new Error("Unknown error processing document"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    reader.readAsArrayBuffer(file)
  })
}

function splitWordDocIntoPages(html: string): string[] {
  // Look for common page break indicators
  const pageBreakPatterns = [
    '<br clear="all" style="page-break-before',
    '<div style="page-break-before',
    '<p style="page-break-before',
    '<hr style="page-break-before',
    '<br style="page-break-before',
    '<br style="mso-special-character:line-break;page-break-before',
    "<!-- PAGE BREAK -->",
  ]

  // If the document is empty or very small, return it as a single page
  if (!html || html.length < 100) {
    return [html]
  }

  // First try to split by explicit page breaks
  let pages: string[] = []
  let hasPageBreaks = false

  // Create a regex pattern that matches any of the page break patterns
  const combinedPattern = pageBreakPatterns
    .map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // Escape regex special chars
    .join("|")

  if (new RegExp(combinedPattern).test(html)) {
    hasPageBreaks = true

    // Split the document at page breaks
    let currentPage = ""
    let remainingHtml = html

    // Find the position of the first page break
    const findNextBreak = (text: string) => {
      let earliestPos = text.length
      let earliestPattern = null

      for (const pattern of pageBreakPatterns) {
        const pos = text.indexOf(pattern)
        if (pos !== -1 && pos < earliestPos) {
          earliestPos = pos
          earliestPattern = pattern
        }
      }

      return { pos: earliestPos, pattern: earliestPattern }
    }

    // Keep extracting pages until no more breaks are found
    while (remainingHtml.length > 0) {
      const { pos, pattern } = findNextBreak(remainingHtml)

      if (pattern && pos !== -1) {
        // Add everything before the page break to the current page
        currentPage += remainingHtml.substring(0, pos)
        pages.push(currentPage)

        // Find the end of the page break tag
        const tagStart = pos
        let tagEnd = remainingHtml.indexOf(">", tagStart)
        if (tagEnd === -1) tagEnd = remainingHtml.length
        tagEnd += 1 // Include the closing '>'

        // Start a new page and continue with the rest of the document
        currentPage = ""
        remainingHtml = remainingHtml.substring(tagEnd)
      } else {
        // No more page breaks, add the rest as the final page
        currentPage += remainingHtml
        pages.push(currentPage)
        break
      }
    }
  }

  // If no explicit page breaks or if splitting resulted in empty pages,
  // try to split by paragraphs (approximately 500 words per page)
  if (!hasPageBreaks || pages.some((page) => !page.trim())) {
    pages = []
    const paragraphs = html.split(/<p[^>]*>/).filter(Boolean)
    let currentPageContent = ""
    let wordCount = 0
    const WORDS_PER_PAGE = 500

    for (const paragraph of paragraphs) {
      const words = paragraph
        .replace(/<[^>]*>/g, " ")
        .split(/\s+/)
        .filter(Boolean)

      if (wordCount + words.length > WORDS_PER_PAGE && currentPageContent) {
        pages.push(currentPageContent)
        currentPageContent = `<p>${paragraph}`
        wordCount = words.length
      } else {
        currentPageContent += `<p>${paragraph}`
        wordCount += words.length
      }
    }

    if (currentPageContent) {
      pages.push(currentPageContent)
    }
  }

  // If we still couldn't split it or ended up with empty pages, just return the whole document as one page
  if (pages.length === 0 || pages.some((page) => !page.trim())) {
    pages = [html]
  }

  // Make sure all pages have proper HTML structure and content
  return pages.map(cleanupPage).filter((page) => page.trim().length > 0)
}

function cleanupPage(html: string): string {
  // Ensure each page has proper HTML structure
  let cleanHtml = html.trim()

  // Fix unclosed tags that might have been cut during splitting
  const openTags = []
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  let match

  while ((match = tagRegex.exec(cleanHtml)) !== null) {
    const fullTag = match[0]
    const tagName = match[1].toLowerCase()

    if (!fullTag.includes("/>") && !fullTag.startsWith("</")) {
      // This is an opening tag
      openTags.push(tagName)
    } else if (fullTag.startsWith("</")) {
      // This is a closing tag
      if (openTags.length > 0 && openTags[openTags.length - 1] === tagName) {
        openTags.pop()
      }
    }
  }

  // Close any tags that were left open
  for (let i = openTags.length - 1; i >= 0; i--) {
    cleanHtml += `</${openTags[i]}>`
  }

  // Add any missing opening tags for basic structure
  if (!cleanHtml.includes("<body") && !cleanHtml.includes("<html")) {
    cleanHtml = `<div class="document-page">${cleanHtml}</div>`
  }

  // Remove any page break markers but preserve the content
  cleanHtml = cleanHtml.replace(/<br clear="all" style="page-break[^>]*>/g, "")
  cleanHtml = cleanHtml.replace(/<div style="page-break[^>]*>/g, "<div>")
  cleanHtml = cleanHtml.replace(/<p style="page-break[^>]*>/g, "<p>")
  cleanHtml = cleanHtml.replace(/<hr style="page-break[^>]*>/g, "")
  cleanHtml = cleanHtml.replace(/<br style="page-break[^>]*>/g, "")
  cleanHtml = cleanHtml.replace(/<!-- PAGE BREAK -->/g, "")

  // Ensure there's actual content in the page
  const textContent = cleanHtml.replace(/<[^>]*>/g, "").trim()
  if (textContent.length === 0) {
    return "" // Return empty string for pages with no actual content
  }

  return cleanHtml
}

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
