import { NextResponse } from "next/server"
import { scheduleInterview } from "@/lib/agents/scheduler-agent"

export async function POST(request: Request) {
  try {
    const { matchId, availableSlots } = await request.json()

    if (!matchId || !availableSlots || !availableSlots.length) {
      return NextResponse.json({ error: "Missing matchId or availableSlots" }, { status: 400 })
    }

    const result = await scheduleInterview(matchId, availableSlots)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in interviews API:", error)
    return NextResponse.json({ error: "Failed to schedule interview" }, { status: 500 })
  }
}

