import { NextResponse } from "next/server"
import { runRecruitmentWorkflow } from "@/lib/agents/orchestrator"

export async function POST(request: Request) {
  try {
    const { jobTitle, company, jobDescription, resumes, availableInterviewSlots } = await request.json()

    if (!jobTitle || !company || !jobDescription || !resumes || !availableInterviewSlots) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await runRecruitmentWorkflow(jobTitle, company, jobDescription, resumes, availableInterviewSlots)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in workflow API:", error)
    return NextResponse.json({ error: "Failed to run recruitment workflow" }, { status: 500 })
  }
}

