"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InterviewsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState("")
  const [shortlistedCandidates, setShortlistedCandidates] = useState([
    { id: "1", name: "John Doe", job: "Senior Software Engineer", score: 92 },
    { id: "2", name: "Jane Smith", job: "Product Manager", score: 88 },
    { id: "3", name: "Alex Johnson", job: "UX Designer", score: 85 },
  ])

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  const handleSchedule = async () => {
    if (!date || !timeSlot || !selectedCandidate) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and candidate",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")
      const dateTimeSlot = `${formattedDate} ${timeSlot}`

      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: selectedCandidate,
          availableSlots: [dateTimeSlot],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to schedule interview")
      }

      const data = await response.json()

      toast({
        title: "Interview Scheduled",
        description: `Email sent to ${data.candidateName}`,
      })

      // Reset form
      setDate(undefined)
      setTimeSlot("")
      setSelectedCandidate("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule interview",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Interview Management</h1>

      <Tabs defaultValue="schedule">
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">Schedule Interviews</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="past">Past Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Interview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateSelect">Select Candidate</Label>
                  <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                    <SelectTrigger id="candidateSelect">
                      <SelectValue placeholder="Select a shortlisted candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {shortlistedCandidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          {candidate.name} - {candidate.job} (Match: {candidate.score}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSlot">Select Time Slot</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger id="timeSlot">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSchedule}
                  className="w-full"
                  disabled={loading || !date || !timeSlot || !selectedCandidate}
                >
                  {loading ? "Scheduling..." : "Schedule Interview"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">1. Select Candidate</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from shortlisted candidates who have been matched to jobs.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">2. Set Date & Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Select an available date and time slot for the interview.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">3. Automated Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI agent will generate and send a personalized interview invitation email to the candidate.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">4. Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    Track the status of the interview and receive notifications when candidates confirm.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">No upcoming interviews scheduled.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">No past interviews found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

