"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, User, BarChart3, Eye } from "lucide-react"
import { CourseOnboardingModal } from "@/components/learner/course-onboarding-modal"
import Link from "next/link"

// Mock data for courses
const courses = [
    {
        id: 1,
        title: "Introduction to Python",
        description: "Learn the fundamentals of Python programming from scratch",
        progress: 75,
        status: "in-progress" as const,
    },
    {
        id: 2,
        title: "Web Development Basics",
        description: "Master HTML, CSS, and JavaScript fundamentals",
        progress: 45,
        status: "in-progress" as const,
    },
    {
        id: 3,
        title: "Data Structures & Algorithms",
        description: "Essential computer science concepts for problem solving",
        progress: 0,
        status: "not-started" as const,
    },
    {
        id: 4,
        title: "Machine Learning Fundamentals",
        description: "Introduction to ML concepts and practical applications",
        progress: 0,
        status: "not-started" as const,
    },
]

export default function CourseDashboard() {
    const router = useRouter()
    const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleStartCourse = (course: (typeof courses)[0]) => {
        setSelectedCourse(course)
        setIsModalOpen(true)
    }

    const handleContinueCourse = (courseId: number) => {
        // Navigate to module list page
        router.push(`/learner/course/${courseId}`)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-slate-900">LMW.ai</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-600">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">My Courses</h1>
                    <p className="text-lg text-slate-600">Continue your learning journey with our comprehensive courses.</p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card
                            key={course.id}
                            className="group hover:shadow-xl transition-all duration-300 border-0 glass-effect hover:scale-105"
                        >
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {course.title}
                                </CardTitle>
                                <CardDescription className="text-slate-600 line-clamp-3">{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {course.status === "in-progress" && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Progress</span>
                                            <span className="font-medium text-slate-700">{course.progress}% Complete</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2" />
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 gap-2 bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                                    >
                                        <BarChart3 className="h-4 w-4" />
                                        View Outline
                                    </Button>
                                    {course.status === "not-started" ? (
                                        <Button 
                                            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                                            onClick={() => handleStartCourse(course)}
                                        >
                                            <Eye className="h-4 w-4" />
                                            Start Course
                                        </Button>
                                    ) : (
                                        <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90" asChild>
                                            <Link href={`/learner/course/${course.id}`}>
                                                <Eye className="h-4 w-4" />
                                                Continue
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Course Onboarding Modal */}
            <CourseOnboardingModal
                course={selectedCourse}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedCourse(null)
                }}
            />
        </div>
    )
}
