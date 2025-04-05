import { NextResponse } from "next/server"
import { parseResume } from "@/lib/agents/resume-parser-agent"

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Missing resume text" }, { status: 400 })
    }

    const result = await parseResume(resumeText)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in candidates API:", error)
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 })
  }
}

