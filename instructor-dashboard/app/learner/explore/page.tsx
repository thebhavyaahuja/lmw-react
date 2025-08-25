"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, User, Clock, Users, Star, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for available courses
const availableCourses = [
    {
        id: 5,
        title: "Advanced React Development",
        description: "Master advanced React concepts including hooks, context, and performance optimization",
        instructor: "Dr. Sarah Johnson",
        duration: "8 weeks",
        level: "Advanced",
        students: 1240,
        rating: 4.8,
        category: "Programming",
        tags: ["React", "JavaScript", "Frontend"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 6,
        title: "Digital Marketing Mastery",
        description: "Complete guide to digital marketing including SEO, social media, and content marketing",
        instructor: "Mark Thompson",
        duration: "10 weeks",
        level: "Beginner",
        students: 2150,
        rating: 4.6,
        category: "Marketing",
        tags: ["SEO", "Social Media", "Analytics"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 7,
        title: "Artificial Intelligence Fundamentals",
        description: "Introduction to AI concepts, machine learning algorithms, and practical applications",
        instructor: "Prof. Michael Chen",
        duration: "12 weeks",
        level: "Intermediate",
        students: 980,
        rating: 4.9,
        category: "Technology",
        tags: ["AI", "Machine Learning", "Python"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 8,
        title: "UI/UX Design Principles",
        description: "Learn design thinking, user research, prototyping, and interface design best practices",
        instructor: "Emily Rodriguez",
        duration: "6 weeks",
        level: "Beginner",
        students: 1850,
        rating: 4.7,
        category: "Design",
        tags: ["UI", "UX", "Design", "Figma"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 9,
        title: "Data Science with Python",
        description: "Complete data science course covering pandas, numpy, matplotlib, and machine learning",
        instructor: "Dr. Alex Kumar",
        duration: "14 weeks",
        level: "Intermediate",
        students: 3200,
        rating: 4.8,
        category: "Data Science",
        tags: ["Python", "Data Analysis", "ML"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 10,
        title: "Cybersecurity Essentials",
        description: "Learn about network security, ethical hacking, and protecting digital assets",
        instructor: "Robert Martinez",
        duration: "9 weeks",
        level: "Intermediate",
        students: 750,
        rating: 4.5,
        category: "Security",
        tags: ["Security", "Networking", "Ethical Hacking"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 11,
        title: "Mobile App Development",
        description: "Build iOS and Android apps using React Native and modern development practices",
        instructor: "Lisa Zhang",
        duration: "11 weeks",
        level: "Advanced",
        students: 1400,
        rating: 4.6,
        category: "Programming",
        tags: ["React Native", "Mobile", "iOS", "Android"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    },
    {
        id: 12,
        title: "Cloud Computing Fundamentals",
        description: "Introduction to AWS, Azure, and Google Cloud platforms with hands-on projects",
        instructor: "David Wilson",
        duration: "7 weeks",
        level: "Beginner",
        students: 1920,
        rating: 4.4,
        category: "Technology",
        tags: ["AWS", "Azure", "Cloud", "DevOps"],
        price: "Free",
        thumbnail: "/placeholder.jpg"
    }
]

const categories = ["All", "Programming", "Marketing", "Technology", "Design", "Data Science", "Security"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedLevel, setSelectedLevel] = useState("All")

    const filteredCourses = availableCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
        const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
        
        return matchesSearch && matchesCategory && matchesLevel
    })

    const handleJoinCourse = (courseId: number) => {
        // In a real app, this would make an API call to enroll the user
        alert(`Joining course ${courseId}! This would redirect to enrollment process.`)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/learner" className="text-2xl font-bold text-slate-900 hover:text-primary">
                                LMW.ai
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/learner" className="text-slate-600 hover:text-slate-900">
                                My Courses
                            </Link>
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Explore Courses</h1>
                    <p className="text-lg text-slate-600">Discover new skills and advance your career with our expert-led courses.</p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                                <Input
                                    placeholder="Search courses, skills, or topics..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[150px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {levels.map(level => (
                                        <SelectItem key={level} value={level}>
                                            {level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        Showing {filteredCourses.length} of {availableCourses.length} courses
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Card
                            key={course.id}
                            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm hover:scale-105"
                        >
                            <div className="aspect-video bg-slate-200 rounded-t-lg relative overflow-hidden">
                                <img 
                                    src={course.thumbnail} 
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                                        {course.price}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="text-xs">
                                        {course.category}
                                    </Badge>
                                    <Badge 
                                        variant={course.level === "Beginner" ? "default" : 
                                               course.level === "Intermediate" ? "secondary" : "destructive"}
                                        className="text-xs"
                                    >
                                        {course.level}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                    {course.title}
                                </CardTitle>
                                <CardDescription className="text-slate-600 line-clamp-3">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-slate-600">
                                    <p className="font-medium">By {course.instructor}</p>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{course.students.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{course.rating}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {course.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {course.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{course.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                                    >
                                        Preview
                                    </Button>
                                    <Button 
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                        onClick={() => handleJoinCourse(course.id)}
                                    >
                                        Join Course
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* No results message */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-slate-400 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No courses found</h3>
                        <p className="text-slate-600">
                            Try adjusting your search or filter criteria to find more courses.
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}
