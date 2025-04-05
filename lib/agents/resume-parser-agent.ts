import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { getDb } from "../db"

// Schema for resume parsing
const resumeSchema = z.object({
  name: z.string().describe("Candidate's full name"),
  email: z.string().email().describe("Candidate's email address"),
  skills: z.array(z.string()).describe("Technical and soft skills of the candidate"),
  experience: z
    .array(
      z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        duration: z.string().describe("Duration of employment"),
        description: z.string().describe("Description of responsibilities and achievements"),
      }),
    )
    .describe("Professional experience"),
  education: z
    .array(
      z.object({
        degree: z.string().describe("Degree obtained"),
        institution: z.string().describe("Educational institution"),
        year: z.string().describe("Year of graduation"),
      }),
    )
    .describe("Educational background"),
})

export async function parseResume(resumeText: string) {
  try {
    // Use AI to extract structured information from the resume
    const { object: parsedResume } = await generateObject({
      model: openai("gpt-4o"),
      schema: resumeSchema,
      prompt: `
        Parse the following resume and extract structured information:
        
        ${resumeText}
      `,
    })

    // Store the candidate information in the database
    const db = await getDb()
    const result = await db.run(
      `INSERT INTO candidates (name, email, resume_text, skills, experience, education) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        parsedResume.name,
        parsedResume.email,
        resumeText,
        JSON.stringify(parsedResume.skills),
        JSON.stringify(parsedResume.experience),
        JSON.stringify(parsedResume.education),
      ],
    )

    return {
      candidateId: result.lastID,
      parsedResume,
    }
  } catch (error) {
    console.error("Error in resume parser agent:", error)
    throw new Error("Failed to parse resume")
  }
}

