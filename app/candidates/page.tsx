"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, ArrowRight, CheckCircle, FileText } from "lucide-react"

export default function CandidatesPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const [selectedJob, setSelectedJob] = useState("")
  const [jobs, setJobs] = useState([
    { id: "1", title: "Senior Software Engineer" },
    { id: "2", title: "Product Manager" },
    { id: "3", title: "UX Designer" },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, parse the resume
      const parseResponse = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      })

      if (!parseResponse.ok) {
        throw new Error("Failed to parse resume")
      }

      const parseData = await parseResponse.json()

      // If a job is selected, match the candidate to the job
      if (selectedJob) {
        const matchResponse = await fetch("/api/matches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateId: parseData.candidateId,
            jobId: selectedJob,
          }),
        })

        if (!matchResponse.ok) {
          throw new Error("Failed to match candidate to job")
        }

        const matchData = await matchResponse.json()

        toast({
          title: "Candidate Processed Successfully",
          description: `Match score: ${matchData.overallScore}%`,
        })
      } else {
        toast({
          title: "Candidate Added Successfully",
          description: `Candidate ID: ${parseData.candidateId}`,
        })
      }

      // Reset form
      setResumeText("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process candidate",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Candidate Management</h1>
        <p className="text-muted-foreground">Add and match candidates to your job openings</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-2 shadow-md">
          <CardHeader className="bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Add New Candidate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resumeText" className="text-sm font-medium">
                  Resume Text
                </Label>
                <Textarea
                  id="resumeText"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the candidate's resume text here..."
                  rows={12}
                  className="border-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobSelect" className="text-sm font-medium">
                  Match to Job (Optional)
                </Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger
                    id="jobSelect"
                    className="border-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <SelectValue placeholder="Select a job to match against" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Just parse resume)</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 transition-all"
                disabled={loading}
              >
                {loading ? "Processing..." : "Add Candidate"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 shadow-md card-hover">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Add Resume</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste the candidate's resume text into the form. Our system works with plain text resumes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium">AI Parsing</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI agent will extract structured information from the resume, including skills, experience, and
                    education.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Job Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Optionally match the candidate against a specific job to get a match score and determine if they
                    should be shortlisted.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Automated Follow-up</h3>
                  <p className="text-sm text-muted-foreground">
                    Qualified candidates will automatically be moved to the interview scheduling process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-200 bg-brand-50 dark:bg-brand-900/10 dark:border-brand-800 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Resume Parsing</h3>
                  <p className="text-sm text-muted-foreground">Our system extracts structured data from resumes</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Identifies skills and technologies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Extracts work experience details</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Recognizes education and certifications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Calculates accurate job match scores</span>
                </li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="w-full border-brand-200 text-brand-700 hover:bg-brand-100 hover:text-brand-800"
              >
                <a href="#" target="_blank" rel="noreferrer">
                  Learn more about our matching algorithm <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

