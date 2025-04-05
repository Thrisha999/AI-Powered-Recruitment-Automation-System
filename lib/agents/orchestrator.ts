import { analyzeJobDescription } from "./job-description-agent"
import { parseResume } from "./resume-parser-agent"
import { matchCandidateToJob, getShortlistedCandidates } from "./matching-agent"
import { scheduleInterview } from "./scheduler-agent"

// Orchestrator agent that coordinates the entire recruitment workflow
export async function runRecruitmentWorkflow(
  jobTitle: string,
  company: string,
  jobDescription: string,
  resumes: string[],
  availableInterviewSlots: string[],
) {
  try {
    // Step 1: Analyze job description
    console.log("Step 1: Analyzing job description...")
    const { jobId, requirements } = await analyzeJobDescription(jobTitle, company, jobDescription)

    // Step 2: Parse resumes
    console.log("Step 2: Parsing resumes...")
    const candidateIds = []
    for (const resume of resumes) {
      const { candidateId } = await parseResume(resume)
      candidateIds.push(candidateId)
    }

    // Step 3: Match candidates to job
    console.log("Step 3: Matching candidates to job...")
    const matchResults = []
    for (const candidateId of candidateIds) {
      const matchResult = await matchCandidateToJob(candidateId, jobId)
      matchResults.push({ candidateId, ...matchResult })
    }

    // Step 4: Get shortlisted candidates
    console.log("Step 4: Shortlisting candidates...")
    const shortlistedCandidates = await getShortlistedCandidates(jobId)

    // Step 5: Schedule interviews for shortlisted candidates
    console.log("Step 5: Scheduling interviews...")
    const scheduledInterviews = []
    for (const candidate of shortlistedCandidates) {
      const interviewResult = await scheduleInterview(candidate.match_id, availableInterviewSlots)
      scheduledInterviews.push(interviewResult)
    }

    return {
      jobId,
      requirements,
      candidateIds,
      matchResults,
      shortlistedCandidates,
      scheduledInterviews,
    }
  } catch (error) {
    console.error("Error in recruitment workflow:", error)
    throw new Error("Failed to complete recruitment workflow")
  }
}

