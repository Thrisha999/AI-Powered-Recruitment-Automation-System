import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { getDb } from "../db"

// Schema for job description extraction
const jobRequirementsSchema = z.object({
  skills: z.array(z.string()).describe("Technical and soft skills required for the job"),
  experience: z.array(z.string()).describe("Experience requirements including years and domains"),
  education: z.array(z.string()).describe("Educational requirements and qualifications"),
  responsibilities: z.array(z.string()).describe("Key job responsibilities and duties"),
})

export async function analyzeJobDescription(jobTitle: string, company: string, description: string) {
  try {
    // Use AI to extract structured information from the job description
    const { object: requirements } = await generateObject({
      model: openai("gpt-4o"),
      schema: jobRequirementsSchema,
      prompt: `
        Extract the key requirements from the following job description:
        
        Job Title: ${jobTitle}
        Company: ${company}
        Description: ${description}
        
        Please identify the required skills, experience, education, and responsibilities.
      `,
    })

    // Store the job and extracted requirements in the database
    const db = await getDb()
    const result = await db.run(`INSERT INTO jobs (title, company, description, requirements) VALUES (?, ?, ?, ?)`, [
      jobTitle,
      company,
      description,
      JSON.stringify(requirements),
    ])

    return {
      jobId: result.lastID,
      requirements,
    }
  } catch (error) {
    console.error("Error in job description agent:", error)
    throw new Error("Failed to analyze job description")
  }
}

