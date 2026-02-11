import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import CourseCard, { Course } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const EnrolledCourses: React.FC = () => {
  const { data: enrollments = [] } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/enrollments`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch enrollments');
      return res.json();
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              My Courses
            </h1>
            <p className="text-muted-foreground mt-1">
              Continue learning from where you left off
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse More Courses
            </Button>
          </Link>
        </div>

        {/* Course Grid */}
        {enrollments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment: any) => (
              <CourseCard key={enrollment._id} course={{
                id: enrollment.courseId._id || enrollment.courseId.id,
                title: enrollment.courseId.title,
                description: enrollment.courseId.description,
                instructor: enrollment.courseId.instructor || 'School',
                thumbnail: enrollment.courseId.thumbnail || '',
                category: enrollment.courseId.category || 'School Course',
                duration: `${enrollment.courseId.totalLessons} lessons`,
                studentsEnrolled: 0,
                rating: 0,
                price: enrollment.courseId.price,
                level: enrollment.courseId.level || 'Beginner',
                lessonsCount: enrollment.courseId.totalLessons,
                progress: enrollment.progress || 0,
                isEnrolled: true,
              }} variant="enrolled" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No courses yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start your learning journey by enrolling in a course
            </p>
            <Link to="/courses">
              <Button className="btn-primary-gradient">
                Explore School Courses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EnrolledCourses;
