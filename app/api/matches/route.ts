import { NextResponse } from "next/server"
import { matchCandidateToJob } from "@/lib/agents/matching-agent"

export async function POST(request: Request) {
  try {
    const { candidateId, jobId } = await request.json()

    if (!candidateId || !jobId) {
      return NextResponse.json({ error: "Missing candidateId or jobId" }, { status: 400 })
    }

    const result = await matchCandidateToJob(candidateId, jobId)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in matches API:", error)
    return NextResponse.json({ error: "Failed to match candidate to job" }, { status: 500 })
  }
}

