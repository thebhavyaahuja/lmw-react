"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Plus, BarChart3, Eye } from "lucide-react"

interface Course {
  course_id: string;
  course_name: string;
  course_description: string;
  created_at: string | null;
  updated_at: string | null;
  is_active: boolean;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://10.4.25.215:8000/api/courses', {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Courses API Response:', data);
          setCourses(data);
        } else {
          console.error('Failed to fetch courses:', response.status);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      {/* <AIAssistant /> */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">My Courses</h1>
            <p className="text-xl text-slate-600">Manage and create your educational content</p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-slate-600">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center text-slate-600">No courses found.</div>
            ) : (
              courses.map((course) => (
                <Card
                  key={course.course_id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 glass-effect hover:scale-105"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {course.course_name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 line-clamp-3">{course.course_description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <BarChart3 className="h-4 w-4" />
                        View Analytics
                      </Button>
                      <Button className="flex-1 gap-2" asChild>
                        <Link href={`/course/${course.course_id}`}>
                          <Eye className="h-4 w-4" />
                          View Course
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Floating Action Button - moved to left */}
          <Link href="/upload">
            <Button
              size="lg"
              className="fixed bottom-8 left-8 h-16 px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 shiny-button gap-3 rounded-full text-lg font-semibold z-40"
            >
              <Plus className="h-6 w-6" />
              Create New Course
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}
