import { NextResponse } from "next/server"
import { analyzeJobDescription } from "@/lib/agents/job-description-agent"

export async function POST(request: Request) {
  try {
    const { title, company, description } = await request.json()

    if (!title || !company || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await analyzeJobDescription(title, company, description)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in jobs API:", error)
    return NextResponse.json({ error: "Failed to process job description" }, { status: 500 })
  }
}

