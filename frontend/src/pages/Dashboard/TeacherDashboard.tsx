import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  PlusCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const myCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
    studentsEnrolled: 1250,
    rating: 4.9,
    revenue: 24500,
    status: 'published',
    completionRate: 78,
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    studentsEnrolled: 856,
    rating: 4.8,
    revenue: 17120,
    status: 'published',
    completionRate: 65,
  },
  {
    id: '3',
    title: 'Node.js Microservices',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    studentsEnrolled: 0,
    rating: 0,
    revenue: 0,
    status: 'draft',
    completionRate: 0,
  },
];

const recentEnrollments = [
  { name: 'John Doe', course: 'Web Development Bootcamp', date: '2 hours ago', avatar: 'J' },
  { name: 'Sarah Smith', course: 'Advanced React Patterns', date: '5 hours ago', avatar: 'S' },
  { name: 'Mike Johnson', course: 'Web Development Bootcamp', date: '1 day ago', avatar: 'M' },
  { name: 'Emily Brown', course: 'Advanced React Patterns', date: '2 days ago', avatar: 'E' },
];

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, {user?.name}! 📚
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your courses and track student progress.
            </p>
          </div>
          <Link to="/create-course">
            <Button className="btn-primary-gradient">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Courses"
            value={3}
            icon={BookOpen}
          />
          <StatCard
            title="Total Students"
            value="2,106"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value="$41,620"
            icon={DollarSign}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Avg. Completion"
            value="72%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
              <Link to="/manage-courses" className="text-sm text-primary hover:underline">
                Manage All
              </Link>
            </div>
            
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="card-elevated p-4">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {course.title}
                            </h3>
                            <Badge
                              variant={course.status === 'published' ? 'default' : 'secondary'}
                              className={course.status === 'published' ? 'bg-success/10 text-success border-success/20' : ''}
                            >
                              {course.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {course.studentsEnrolled} students
                            </span>
                            {course.rating > 0 && (
                              <span>⭐ {course.rating}</span>
                            )}
                            {course.revenue > 0 && (
                              <span className="text-success font-medium">
                                ${course.revenue.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {course.status === 'published' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Completion Rate</span>
                            <span className="font-medium">{course.completionRate}%</span>
                          </div>
                          <Progress value={course.completionRate} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Enrollments */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Enrollments</h3>
              <div className="space-y-4">
                {recentEnrollments.map((enrollment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 pb-4 last:pb-0 last:border-0 border-b border-border"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {enrollment.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {enrollment.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {enrollment.course}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {enrollment.date}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/teacher/students">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Students
                </Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/create-course" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                </Link>
                <Link to="/manage-courses" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Content
                  </Button>
                </Link>
                <Link to="/teacher/students" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
