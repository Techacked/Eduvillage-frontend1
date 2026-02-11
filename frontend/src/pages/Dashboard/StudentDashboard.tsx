import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import CourseCard from '@/components/CourseCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/enrollments`, { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    }
  });

  // ---------- ✅ DUMMY FALLBACK DATA ----------
  const dummyCourses = [
    {
      id: "1",
      title: "Class 10 - Mathematics",
      description: "Algebra, Polynomials, Geometry & more",
      instructor: "EduVillage Instructor",
      thumbnail: "https://images.pexels.com/photos/4145191/pexels-photo-4145191.jpeg",
      category: "School Course",
      duration: "12 lessons",
      studentsEnrolled: 200,
      rating: 4.6,
      price: 100,
      level: "Intermediate",
      lessonsCount: 12,
      progress: 60,
      isEnrolled: true,
    },
    {
      id: "2",
      title: "Class 10 - Science",
      description: "Physics, Chemistry & Biology basics",
      instructor: "EduVillage Instructor",
      thumbnail: "https://images.pexels.com/photos/5905941/pexels-photo-5905941.jpeg",
      category: "School Course",
      duration: "10 lessons",
      studentsEnrolled: 180,
      rating: 4.4,
      price: 120,
      level: "Beginner",
      lessonsCount: 10,
      progress: 30,
      isEnrolled: true,
    }
  ];

  const enrolledCourses =
    enrollments.length > 0
      ? enrollments.map(enrollment => ({
          id: enrollment.courseId?._id,
          title: enrollment.courseId?.title,
          description: enrollment.courseId?.description,
          instructor: enrollment.courseId?.instructor || 'School',
          thumbnail: enrollment.courseId?.thumbnail || '',
          category: enrollment.courseId?.category || 'School Course',
          duration: `${enrollment.courseId?.totalLessons} lessons`,
          studentsEnrolled: 0,
          rating: 0,
          price: enrollment.courseId?.price,
          level: enrollment.courseId?.level || 'Beginner',
          lessonsCount: enrollment.courseId?.totalLessons,
          progress: enrollment.progress || 0,
          isEnrolled: true,
        }))
      : dummyCourses;

  const totalProgress = Math.round(
    enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length
  );

  const completedCourses = enrolledCourses.filter(c => c.progress >= 100).length;

  // ---------- DEADLINES DATA ----------
  const upcomingDeadlines = [
    {
      title: "Maths - Algebra Assignment",
      course: "Class 10 - Mathematics",
      dueDate: "Tomorrow",
      type: "Assignment",
    },
    {
      title: "Science - Chapter Test",
      course: "Class 10 - Science",
      dueDate: "In 3 days",
      type: "Test",
    },
    {
      title: "Homework Submission",
      course: "Class 10 - Mathematics",
      dueDate: "Next Monday",
      type: "Homework",
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Continue where you left off and track your learning progress.
            </p>
          </div>
          <Link to="/courses">
            <Button className="btn-primary-gradient">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Enrolled Courses" value={enrolledCourses.length.toString()} icon={BookOpen} />
          <StatCard title="Hours Learned" value="12" icon={Clock} />
          <StatCard title="Certificates Earned" value={completedCourses.toString()} icon={Trophy} />
          <StatCard title="Average Progress" value={`${totalProgress}%`} icon={TrendingUp} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
            </div>

            {/* Current Course */}
            <div className="card-elevated p-6">
              <div className="flex gap-6">
                <img
                  src={enrolledCourses[0].thumbnail}
                  className="w-48 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{enrolledCourses[0].title}</h3>
                  <p className="text-muted-foreground">{enrolledCourses[0].instructor}</p>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-primary font-medium">
                        {enrolledCourses[0].progress}% complete
                      </span>
                    </div>
                    <Progress value={enrolledCourses[0].progress} className="h-2 mt-1" />
                  </div>

                  <Button size="sm" className="btn-primary-gradient mt-4">
                    Continue Course
                  </Button>
                </div>
              </div>
            </div>

            {/* Other Courses */}
            <div className="grid md:grid-cols-2 gap-4">
              {enrolledCourses.slice(1).map(course => (
                <CourseCard key={course.id} course={course} variant="compact" />
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Deadlines */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Deadlines
              </h3>

              <div className="mt-4 space-y-4">
                {upcomingDeadlines.map((d, i) => (
                  <div key={i} className="border-b pb-3">
                    <p className="font-medium">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.course}</p>
                    <p className="text-xs text-warning">{d.dueDate}</p>
                  </div>
                ))}
              </div>

              <Button size="sm" variant="outline" className="w-full mt-4">
                View All Assessments
              </Button>
            </div>

            {/* Streak */}
            <div className="card-elevated p-6 text-center">
              <Trophy className="w-12 h-12 text-warning mx-auto mb-3" />
              <h3 className="font-semibold">7 Day Streak 🔥</h3>
              <p className="text-sm text-muted-foreground">Keep learning to maintain your streak!</p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
