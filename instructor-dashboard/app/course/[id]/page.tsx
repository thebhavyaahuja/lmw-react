"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AIAssistant } from "@/components/ai-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Target, FileQuestion, PenTool, ChevronRight } from "lucide-react"

const courseData = {
  title: "Introduction to Programming",
  topics: [
    {
      id: 1,
      title: "Introduction to Programming",
      lessons: [
        { id: 1, title: "What is Programming?", active: true },
        { id: 2, title: "Setting up Development Environment", active: false },
        { id: 3, title: "Your First Program", active: false },
      ],
    },
    {
      id: 2,
      title: "Python Fundamentals",
      lessons: [
        { id: 4, title: "Variables and Data Types", active: false },
        { id: 5, title: "Control Structures", active: false },
        { id: 6, title: "Functions and Modules", active: false },
      ],
    },
    {
      id: 3,
      title: "Data Structures",
      lessons: [
        { id: 7, title: "Lists and Tuples", active: false },
        { id: 8, title: "Dictionaries and Sets", active: false },
        { id: 9, title: "Working with Files", active: false },
      ],
    },
  ],
}

const lessonContent = `# What is Programming?

Programming is the process of creating instructions for computers to follow. These instructions, called code, tell the computer exactly what to do and how to do it.

## Key Concepts

Programming involves several fundamental concepts:

1. **Problem Solving**: Breaking down complex problems into smaller, manageable pieces
2. **Logic**: Creating step-by-step solutions that computers can understand
3. **Syntax**: Learning the specific rules and structure of programming languages

## Why Learn Programming?

Programming skills are valuable because they:
- Enable you to create software applications
- Improve logical thinking and problem-solving abilities
- Open up career opportunities in technology
- Allow you to automate repetitive tasks

## Getting Started

To begin programming, you'll need:
- A computer with internet access
- A text editor or integrated development environment (IDE)
- Patience and practice

\`\`\`python
# Your first Python program
print("Hello, World!")
\`\`\`

Programming is like learning a new language - it takes time and practice to become fluent, but the rewards are worth the effort.

## Practice Exercise

Try writing a simple program that asks for your name and greets you personally.`

export default function CoursePage() {
  const [selectedLesson, setSelectedLesson] = useState(1)
  const [objectives, setObjectives] = useState(
    "Students will understand the basic concepts of programming and be able to explain what programming is and why it's important.",
  )
  const [concepts] = useState(["Problem solving", "Logic", "Syntax", "Programming languages"])

  return (
    <>
      <Header />
      {/* <AIAssistant /> */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
            {/* Left Column: Course Navigation */}
            <Card className="border-0 glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">{courseData.title}</CardTitle>
                <CardDescription>Course Navigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseData.topics.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{topic.title}</h3>
                    <div className="ml-4 space-y-1">
                      {topic.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            lesson.id === selectedLesson
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-slate-100 text-slate-600"
                          }`}
                        >
                          <ChevronRight className="h-3 w-3" />
                          {lesson.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Middle Column: Lesson Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 glass-effect h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    What is Programming?
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none overflow-y-auto">
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">{lessonContent}</div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Knowledge Components */}
            <Card className="border-0 glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Lesson Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Concepts */}
                <div className="space-y-2">
                  <Label>Key Concepts</Label>
                  <div className="flex flex-wrap gap-2">
                    {concepts.map((concept, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    rows={4}
                    className="text-sm"
                  />
                </div>

                {/* Assessment Actions */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Assessment Actions</h3>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileQuestion className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Generate Quiz</h4>
                          <p className="text-sm text-slate-600">Create assessment questions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <PenTool className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Generate Assignment</h4>
                          <p className="text-sm text-slate-600">Create practical exercises</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
