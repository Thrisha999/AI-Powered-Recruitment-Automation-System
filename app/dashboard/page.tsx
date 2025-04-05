"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText, Users, Calendar, BarChart, Briefcase, CheckCircle, Clock } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">Here's an overview of your recruitment activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-2 shadow-md card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-brand-600" />
              Active Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-md card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-brand-600" />
              Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-md card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-brand-600" />
              Shortlisted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">33% of candidates</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-md card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-brand-600" />
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">62.5% of shortlisted</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="border-2 shadow-md card-hover col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              className="w-full justify-between bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800"
            >
              <Link href="/jobs">
                Add New Job
                <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="w-full justify-between bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800"
            >
              <Link href="/candidates">
                Add New Candidate
                <Users className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="w-full justify-between bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800"
            >
              <Link href="/interviews">
                Schedule Interview
                <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="w-full justify-between bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800"
            >
              <Link href="/analytics">
                View Analytics
                <BarChart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-md card-hover col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest recruitment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New job posted</p>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer at Acme Inc.</p>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  2h ago
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Candidate matched</p>
                  <p className="text-sm text-muted-foreground">John Doe matched with Product Manager (92% match)</p>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  5h ago
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Interview scheduled</p>
                  <p className="text-sm text-muted-foreground">Interview with Jane Smith for UX Designer position</p>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  1d ago
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Candidate shortlisted</p>
                  <p className="text-sm text-muted-foreground">Alex Johnson shortlisted for Senior Software Engineer</p>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  2d ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 shadow-md card-hover">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">UX Designer</p>
                  </div>
                </div>
                <div className="text-sm font-medium">Tomorrow, 10:00 AM</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <div className="text-sm font-medium">Friday, 2:00 PM</div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/interviews">
                  View All Interviews <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-md card-hover">
          <CardHeader>
            <CardTitle>Top Candidates</CardTitle>
            <CardDescription>Highest matching candidates for your open positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-brand-600">92% Match</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-brand-600">88% Match</div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/candidates">
                  View All Candidates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

