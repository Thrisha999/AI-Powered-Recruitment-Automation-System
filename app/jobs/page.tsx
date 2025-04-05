"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FileText, ArrowRight, CheckCircle } from "lucide-react"

export default function JobsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: jobTitle,
          company,
          description: jobDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create job")
      }

      const data = await response.json()

      toast({
        title: "Job Created Successfully",
        description: `Job ID: ${data.jobId} has been created and analyzed.`,
      })

      // Reset form
      setJobTitle("")
      setCompany("")
      setJobDescription("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Management</h1>
        <p className="text-muted-foreground">Create and manage job postings for AI-powered candidate matching</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-2 shadow-md">
          <CardHeader className="bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Add New Job
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="border-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Inc."
                  className="border-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription" className="text-sm font-medium">
                  Job Description
                </Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={10}
                  className="border-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 transition-all"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Create Job"}
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
                  <h3 className="font-medium">Add Job Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the job title, company name, and paste the complete job description.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI agent will analyze the job description to extract key requirements, skills, and
                    responsibilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Candidate Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    The system will automatically match candidates to this job based on their skills and experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-100 text-brand-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Interview Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Qualified candidates will be shortlisted and interview invitations will be automatically generated.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-200 bg-brand-50 dark:bg-brand-900/10 dark:border-brand-800 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system uses advanced AI to understand job requirements
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Extracts required skills and experience</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Identifies key responsibilities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Creates structured job profiles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-600 mr-2 shrink-0" />
                  <span className="text-sm">Enables accurate candidate matching</span>
                </li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="w-full border-brand-200 text-brand-700 hover:bg-brand-100 hover:text-brand-800"
              >
                <a href="#" target="_blank" rel="noreferrer">
                  Learn more about our AI technology <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

