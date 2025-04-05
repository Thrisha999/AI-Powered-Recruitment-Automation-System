import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getDb } from "../db"

export async function scheduleInterview(matchId: number, availableSlots: string[]) {
  try {
    const db = await getDb()

    // Get match, job, and candidate information
    const match = await db.get(
      `
      SELECT m.*, j.title as job_title, j.company, c.name as candidate_name, c.email as candidate_email
      FROM matches m
      JOIN jobs j ON m.job_id = j.id
      JOIN candidates c ON m.candidate_id = c.id
      WHERE m.id = ?
    `,
      [matchId],
    )

    if (!match) {
      throw new Error("Match not found")
    }

    // Generate personalized email content
    const { text: emailContent } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Write a professional and personalized interview invitation email with the following details:
        
        Candidate: ${match.candidate_name}
        Job Position: ${match.job_title}
        Company: ${match.company}
        Available Interview Slots: ${availableSlots.join(", ")}
        
        The email should:
        1. Be warm and welcoming
        2. Briefly mention that they were selected based on their qualifications
        3. Clearly list the available time slots
        4. Explain the interview format (virtual)
        5. Ask them to confirm their preferred slot
        6. Include a professional sign-off
      `,
    })

    // Store the interview in the database
    const result = await db.run(`INSERT INTO interviews (match_id, status, notes) VALUES (?, ?, ?)`, [
      matchId,
      "scheduled",
      JSON.stringify({ availableSlots, emailContent }),
    ])

    return {
      interviewId: result.lastID,
      candidateName: match.candidate_name,
      candidateEmail: match.candidate_email,
      emailContent,
    }
  } catch (error) {
    console.error("Error in scheduler agent:", error)
    throw new Error("Failed to schedule interview")
  }
}

export async function confirmInterviewSlot(interviewId: number, selectedSlot: string) {
  const db = await getDb()

  await db.run(`UPDATE interviews SET scheduled_time = ?, status = ? WHERE id = ?`, [
    selectedSlot,
    "confirmed",
    interviewId,
  ])

  return { success: true, interviewId, scheduledTime: selectedSlot }
}

