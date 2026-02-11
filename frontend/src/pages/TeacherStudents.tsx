import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Eye,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  BookOpen,
  Download,
} from 'lucide-react';

// Mock data - Replace with API call
const studentsData = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    class: 'Class 10',
    section: 'A',
    rollNumber: '101',
    subjects: ['Mathematics', 'Science', 'English'],
    overallProgress: 85,
    lastActive: '2 hours ago',
    status: 'active',
    performance: 'excellent',
    joinedDate: '2024-01-15',
    attendance: 95,
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    class: 'Class 9',
    section: 'B',
    rollNumber: '205',
    subjects: ['Mathematics', 'Science', 'Hindi'],
    overallProgress: 72,
    lastActive: '5 hours ago',
    status: 'active',
    performance: 'good',
    joinedDate: '2024-02-01',
    attendance: 88,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    class: 'Class 12',
    section: 'A',
    rollNumber: '312',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    overallProgress: 45,
    lastActive: '1 day ago',
    status: 'active',
    performance: 'average',
    joinedDate: '2024-01-20',
    attendance: 75,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    class: 'Class 11',
    section: 'C',
    rollNumber: '418',
    subjects: ['Biology', 'Chemistry', 'English'],
    overallProgress: 92,
    lastActive: '3 hours ago',
    status: 'active',
    performance: 'excellent',
    joinedDate: '2024-01-10',
    attendance: 98,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    class: 'Class 8',
    section: 'A',
    rollNumber: '125',
    subjects: ['Mathematics', 'Science', 'Social Studies'],
    overallProgress: 28,
    lastActive: '1 week ago',
    status: 'inactive',
    performance: 'needs-attention',
    joinedDate: '2024-01-25',
    attendance: 62,
  },
  {
    id: '6',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    class: 'Class 10',
    section: 'B',
    rollNumber: '210',
    subjects: ['Mathematics', 'Science', 'English'],
    overallProgress: 78,
    lastActive: '4 hours ago',
    status: 'active',
    performance: 'good',
    joinedDate: '2024-01-18',
    attendance: 90,
  },
];

const TeacherStudents: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filter students based on search and filters
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery);

    const matchesClass =
      filterClass === 'all' || student.class === filterClass;

    const matchesStatus =
      filterStatus === 'all' || student.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      excellent: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      good: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      average: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'needs-attention': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return variants[performance as keyof typeof variants] || variants.average;
  };

  const getPerformanceIcon = (performance: string) => {
    if (performance === 'excellent' || performance === 'good') {
      return <TrendingUp className="h-3 w-3" />;
    }
    return <TrendingDown className="h-3 w-3" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            My Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track your students' progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-3xl font-bold text-blue-600">{studentsData.length}</p>
                </div>
                <Users className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                  <p className="text-3xl font-bold text-green-600">
                    {studentsData.filter((s) => s.status === 'active').length}
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Progress</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(
                      studentsData.reduce((sum, s) => sum + s.overallProgress, 0) /
                        studentsData.length
                    )}
                    %
                  </p>
                </div>
                <Award className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {Math.round(
                      studentsData.reduce((sum, s) => sum + s.attendance, 0) /
                        studentsData.length
                    )}
                    %
                  </p>
                </div>
                <BookOpen className="h-12 w-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="dark:bg-[#1E293B] dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                />
              </div>

              {/* Class Filter */}
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full md:w-[200px] dark:bg-[#0F172A] dark:text-white dark:border-gray-700">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={`Class ${num}`}>
                      Class {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[200px] dark:bg-[#0F172A] dark:text-white dark:border-gray-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="dark:bg-[#1E293B] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No students found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-[#0F172A]"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student.email}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {student.class} - Section {student.section} | Roll: {student.rollNumber}
                            </p>
                          </div>

                          {/* Actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/student/${student.id}`)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Subjects */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {student.subjects.map((subject, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs dark:bg-blue-900/20 dark:text-blue-400"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats Row */}
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Progress</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress
                                value={student.overallProgress}
                                className="h-2 flex-1"
                              />
                              <span className="text-sm font-semibold text-blue-600">
                                {student.overallProgress}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Performance</p>
                            <Badge
                              className={`mt-1 text-xs ${getPerformanceBadge(
                                student.performance
                              )}`}
                            >
                              {getPerformanceIcon(student.performance)}
                              <span className="ml-1 capitalize">
                                {student.performance.replace('-', ' ')}
                              </span>
                            </Badge>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Attendance</p>
                            <p className="text-sm font-semibold dark:text-white mt-1">
                              {student.attendance}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Last Active</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-sm dark:text-gray-300">
                                {student.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
