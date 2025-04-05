import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { getDb } from "../db"

// Schema for candidate-job matching
const matchingSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall match score between 0-100"),
  skillsMatch: z.number().min(0).max(100).describe("Skills match score between 0-100"),
  experienceMatch: z.number().min(0).max(100).describe("Experience match score between 0-100"),
  educationMatch: z.number().min(0).max(100).describe("Education match score between 0-100"),
  reasoning: z.string().describe("Explanation of the matching score"),
})

export async function matchCandidateToJob(candidateId: number, jobId: number) {
  try {
    const db = await getDb()

    // Get job and candidate information
    const job = await db.get("SELECT * FROM jobs WHERE id = ?", [jobId])
    const candidate = await db.get("SELECT * FROM candidates WHERE id = ?", [candidateId])

    if (!job || !candidate) {
      throw new Error("Job or candidate not found")
    }

    const jobRequirements = JSON.parse(job.requirements)
    const candidateSkills = JSON.parse(candidate.skills)
    const candidateExperience = JSON.parse(candidate.experience)
    const candidateEducation = JSON.parse(candidate.education)

    // Use AI to calculate match score
    const { object: matchResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: matchingSchema,
      prompt: `
        Evaluate how well this candidate matches the job requirements:
        
        Job Title: ${job.title}
        Company: ${job.company}
        
        Job Requirements:
        - Skills: ${jobRequirements.skills.join(", ")}
        - Experience: ${jobRequirements.experience.join(", ")}
        - Education: ${jobRequirements.education.join(", ")}
        - Responsibilities: ${jobRequirements.responsibilities.join(", ")}
        
        Candidate:
        - Name: ${candidate.name}
        - Skills: ${candidateSkills.join(", ")}
        - Experience: ${JSON.stringify(candidateExperience)}
        - Education: ${JSON.stringify(candidateEducation)}
        
        Calculate match scores for skills, experience, and education, then provide an overall score and reasoning.
      `,
    })

    // Store the match result in the database
    await db.run(`INSERT INTO matches (job_id, candidate_id, match_score, status) VALUES (?, ?, ?, ?)`, [
      jobId,
      candidateId,
      matchResult.overallScore,
      matchResult.overallScore >= 80 ? "shortlisted" : "rejected",
    ])

    return matchResult
  } catch (error) {
    console.error("Error in matching agent:", error)
    throw new Error("Failed to match candidate to job")
  }
}

export async function getShortlistedCandidates(jobId: number, threshold = 80) {
  const db = await getDb()

  const shortlisted = await db.all(
    `
    SELECT m.id as match_id, m.match_score, c.id as candidate_id, c.name, c.email
    FROM matches m
    JOIN candidates c ON m.candidate_id = c.id
    WHERE m.job_id = ? AND m.match_score >= ?
    ORDER BY m.match_score DESC
  `,
    [jobId, threshold],
  )

  return shortlisted
}

