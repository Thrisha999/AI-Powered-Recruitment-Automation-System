import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Users,
  Calendar,
  BarChart,
  CheckCircle,
  Zap,
  Shield,
  Award,
  BookOpen,
} from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Recruitment Automation
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-brand-100">
              Streamline your hiring process with intelligent candidate matching and automated workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-brand-100">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="#how-it-works">
                  Know More <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Streamline Your Recruitment Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform automates the entire recruitment workflow from job posting to interview scheduling
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card rounded-xl p-6 shadow-sm border card-hover">
              <div className="feature-icon mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Job Analysis</h3>
              <p className="text-muted-foreground mb-4">
                AI extracts key requirements from job descriptions to create structured profiles
              </p>
              <Button asChild variant="link" className="p-0">
                <Link href="/jobs">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border card-hover">
              <div className="feature-icon mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Parsing</h3>
              <p className="text-muted-foreground mb-4">Automatically extract structured data from resumes and CVs</p>
              <Button asChild variant="link" className="p-0">
                <Link href="/candidates">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border card-hover">
              <div className="feature-icon mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interview Scheduling</h3>
              <p className="text-muted-foreground mb-4">
                Automated interview scheduling with personalized email invitations
              </p>
              <Button asChild variant="link" className="p-0">
                <Link href="/interviews">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm border card-hover">
              <div className="feature-icon mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive insights into your recruitment pipeline and metrics
              </p>
              <Button asChild variant="link" className="p-0">
                <Link href="/analytics">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our multi-agent AI system works together to automate your recruitment process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-xl p-8 shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Upload Job Description</h3>
              <p className="text-muted-foreground mb-4">
                Add your job details and our AI will extract key requirements, skills, and responsibilities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Automatic skill extraction</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Experience requirements analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Structured job profiles</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Add Candidates</h3>
              <p className="text-muted-foreground mb-4">
                Upload resumes and our AI will parse them and match candidates to your job requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Automatic resume parsing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Skill and experience matching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Candidate scoring and ranking</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Schedule Interviews</h3>
              <p className="text-muted-foreground mb-4">
                Automatically schedule interviews with qualified candidates and track the process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Automated email generation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Interview slot management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Candidate response tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - New Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages cutting-edge AI to deliver accurate and efficient recruitment automation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card rounded-xl p-8 shadow-sm border card-hover">
              <h3 className="text-2xl font-bold mb-4">Multi-Agent Architecture</h3>
              <p className="text-muted-foreground mb-6">
                TalentAI uses a sophisticated multi-agent system where specialized AI agents work together to handle
                different aspects of the recruitment process. This modular approach ensures accuracy, scalability, and
                continuous improvement.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Job Description Summarizer Agent</h4>
                    <p className="text-sm text-muted-foreground">
                      Analyzes job descriptions to extract key requirements, skills, and responsibilities using natural
                      language processing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Resume Parser Agent</h4>
                    <p className="text-sm text-muted-foreground">
                      Extracts structured information from resumes including education, experience, skills, and
                      achievements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Matching & Shortlisting Agents</h4>
                    <p className="text-sm text-muted-foreground">
                      Compares candidate profiles against job requirements using semantic similarity and selects
                      qualified candidates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border card-hover">
              <h3 className="text-2xl font-bold mb-4">Technical Capabilities</h3>
              <p className="text-muted-foreground mb-6">
                Our platform combines several advanced technologies to deliver a comprehensive recruitment automation
                solution that saves time and improves hiring outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Natural Language Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced NLP models understand the context and semantics of job descriptions and resumes to
                      extract meaningful information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Semantic Matching Algorithm</h4>
                    <p className="text-sm text-muted-foreground">
                      Our proprietary matching algorithm goes beyond keyword matching to understand the true meaning and
                      relevance of skills and experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 text-brand-700 rounded-full p-2 mt-1">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Automated Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      AI-generated personalized emails maintain a professional tone while efficiently managing the
                      interview scheduling process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose TalentAI</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages to streamline your recruitment process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="feature-icon h-12 w-12 shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Reduce time-to-hire by up to 70% with automated resume screening and candidate matching. Our AI
                  processes hundreds of resumes in minutes, not days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="feature-icon h-12 w-12 shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Reduce Bias</h3>
                <p className="text-muted-foreground">
                  Our AI focuses on skills and qualifications, helping to reduce unconscious bias in hiring. The system
                  evaluates candidates based on merit, not background.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="feature-icon h-12 w-12 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Better Matches</h3>
                <p className="text-muted-foreground">
                  Find candidates who truly match your requirements with our advanced matching algorithm. Our semantic
                  analysis understands context, not just keywords.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="feature-icon h-12 w-12 shrink-0">
                <BarChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into your recruitment process with comprehensive analytics. Track metrics like
                  time-to-hire, source effectiveness, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies using TalentAI to find the best candidates faster
          </p>
          <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-brand-100">
            <Link href="/signup">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

