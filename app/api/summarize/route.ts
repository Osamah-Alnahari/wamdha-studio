import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    // Call the provided API endpoint
    const response = await fetch("https://jdypktcpowwsg6wgx7onburtsy0nsuem.lambda-url.me-south-1.on.aws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error(`Summarization API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Ensure we're returning string values
    return NextResponse.json({
      summary: typeof data.summary === "string" ? data.summary : text.substring(0, 200) + "...",
      title: typeof data.title === "string" ? data.title : `Summary ${Date.now()}`,
      imageTitle: typeof data.imageTitle === "string" ? data.imageTitle : "Generated image",
    })
  } catch (error) {
    console.error("Error in summarize API:", error)
    return NextResponse.json({ error: "Failed to summarize text" }, { status: 500 })
  }
}
