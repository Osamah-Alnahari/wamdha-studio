export async function summarizeText(text: string): Promise<{
  title: string
  summary: string
  imageTitle: string
}> {
  // In a real application, this would call an AI service
  // For demo purposes, we'll create a simple summarization

  try {
    // Simple summarization logic
    const words = text.split(/\s+/).filter(Boolean)

    // Create a summary that's about 20% of the original length
    const summaryLength = Math.max(20, Math.min(100, Math.floor(words.length * 0.2)))
    const summary = words.slice(0, summaryLength).join(" ") + "..."

    // Extract a title from the first few words
    const titleWords = words.slice(0, 5)
    const title = titleWords.join(" ")

    // Create an image prompt based on key terms
    // In a real app, this would be more sophisticated
    const imageTitle = `Image of ${titleWords.slice(0, 3).join(" ")}`

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      title,
      summary,
      imageTitle,
    }
  } catch (error) {
    console.error("Error summarizing text:", error)
    return {
      title: "Summary",
      summary: text.substring(0, 200) + "...",
      imageTitle: "Generated image",
    }
  }
}
