"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Check, Lock, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data for course modules
const courseModules = [
    {
        id: 1,
        title: "Getting Started",
        description: "Introduction to the fundamentals",
        duration: "15 min",
        status: "completed" as const,
        lessons: 3,
    },
    {
        id: 2,
        title: "Core Concepts",
        description: "Deep dive into the main principles",
        duration: "30 min",
        status: "in-progress" as const,
        lessons: 5,
    },
    {
        id: 3,
        title: "Practical Applications",
        description: "Hands-on exercises and projects",
        duration: "45 min",
        status: "locked" as const,
        lessons: 4,
    },
    {
        id: 4,
        title: "Advanced Topics",
        description: "Complex scenarios and best practices",
        duration: "60 min",
        status: "locked" as const,
        lessons: 6,
    },
]

const courseData = {
    1: { title: "Introduction to Python", progress: 75 },
    2: { title: "Web Development Basics", progress: 45 },
    3: { title: "Data Structures & Algorithms", progress: 0 },
    4: { title: "Machine Learning Fundamentals", progress: 0 },
}

export default function CoursePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const courseId = parseInt(params.id)
    const course = courseData[courseId as keyof typeof courseData]

    if (!course) {
        return <div>Course not found</div>
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <Check className="h-5 w-5 text-green-600" />
            case "in-progress":
                return <Play className="h-5 w-5 text-blue-600" />
            case "locked":
                return <Lock className="h-5 w-5 text-slate-400" />
            default:
                return null
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "locked":
                return "bg-slate-100 text-slate-500 border-slate-200"
            default:
                return ""
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/learner">
                                <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-xl font-semibold text-slate-900">{course.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-600">
                                Progress: {course.progress}%
                            </div>
                            <Progress value={course.progress} className="w-32" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Modules</h1>
                    <p className="text-lg text-slate-600">Progress through each module to complete the course.</p>
                </div>

                {/* Module List */}
                <div className="space-y-4">
                    {courseModules.map((module) => (
                        <Card
                            key={module.id}
                            className={`group hover:shadow-lg transition-all duration-300 ${module.status === "locked" ? "opacity-60" : "cursor-pointer hover:scale-[1.02]"
                                }`}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1">
                                            {getStatusIcon(module.status)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                                {module.title}
                                            </CardTitle>
                                            <CardDescription className="text-slate-600 mt-1">
                                                {module.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge className={`${getStatusColor(module.status)} capitalize`}>
                                        {module.status.replace("-", " ")}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {module.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="h-4 w-4" />
                                            {module.lessons} lessons
                                        </div>
                                    </div>
                                    {module.status !== "locked" && (
                                        <Button
                                            variant={module.status === "completed" ? "outline" : "default"}
                                            className="gap-2"
                                            asChild
                                        >
                                            <Link href={`/learner/course/${courseId}/module/${module.id}`}>
                                                {module.status === "completed" ? (
                                                    <>
                                                        <Check className="h-4 w-4" />
                                                        Review
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-4 w-4" />
                                                        {module.status === "in-progress" ? "Continue" : "Start"}
                                                    </>
                                                )}
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
