import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react';

// Function to download student report as PDF/Text
const handleDownloadReport = (student: any) => {
  // Create report content
  const reportContent = `
STUDENT REPORT
=====================================

PERSONAL INFORMATION
-------------------------------------
Name: ${student.name}
Class: ${student.class} - Section ${student.section}
Roll Number: ${student.rollNumber}
Email: ${student.email}
Phone: ${student.phone}
Date of Birth: ${new Date(student.dateOfBirth).toLocaleDateString()}
Address: ${student.address}

PARENT/GUARDIAN INFORMATION
-------------------------------------
Name: ${student.parentName}
Phone: ${student.parentPhone}

ACADEMIC PERFORMANCE
-------------------------------------
Overall Progress: ${student.overallProgress}%
Attendance: ${student.attendance}%
Performance Level: ${student.performance.toUpperCase()}
Joined Date: ${new Date(student.joinedDate).toLocaleDateString()}

SUBJECT-WISE PERFORMANCE
-------------------------------------
${student.subjects.map((subject: any) => `
${subject.name}
  Teacher: ${subject.teacher}
  Progress: ${subject.progress}%
  Grade: ${subject.grade}
`).join('\n')}

RECENT ACTIVITIES
-------------------------------------
${student.recentActivities.map((activity: any) => `
- ${activity.title} (${activity.date})
  Status: ${activity.status}
`).join('\n')}

ACHIEVEMENTS
-------------------------------------
${student.achievements.map((achievement: any) => `
- ${achievement.title}
  ${achievement.description}
  Date: ${new Date(achievement.date).toLocaleDateString()}
`).join('\n')}

=====================================
Report Generated: ${new Date().toLocaleString()}
EduVillage Learning Platform
=====================================
  `.trim();

  // Create blob and download
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${student.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Mock student data - Replace with API call
const getStudentById = (id: string) => {
  const students = {
    '1': {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      class: 'Class 10',
      section: 'A',
      rollNumber: '101',
      dateOfBirth: '2008-05-15',
      address: 'Mumbai, Maharashtra',
      parentName: 'Mr. Rajesh Sharma',
      parentPhone: '+91 98765 43211',
      subjects: [
        { name: 'Mathematics', progress: 90, grade: 'A+', teacher: 'Mrs. Gupta' },
        { name: 'Science', progress: 85, grade: 'A', teacher: 'Mr. Verma' },
        { name: 'English', progress: 78, grade: 'B+', teacher: 'Ms. Kapoor' },
        { name: 'Hindi', progress: 88, grade: 'A', teacher: 'Mrs. Sharma' },
        { name: 'Social Studies', progress: 82, grade: 'A', teacher: 'Mr. Patel' },
      ],
      overallProgress: 85,
      attendance: 95,
      status: 'active',
      performance: 'excellent',
      joinedDate: '2024-01-15',
      recentActivities: [
        { type: 'assignment', title: 'Math Assignment 5 submitted', date: '2 hours ago', status: 'completed' },
        { type: 'test', title: 'Science Quiz completed', date: '1 day ago', status: 'completed' },
        { type: 'attendance', title: 'Marked present', date: '2 days ago', status: 'present' },
      ],
      achievements: [
        { title: 'Top Performer', description: 'Scored highest in Mathematics', date: '2024-02-01' },
        { title: 'Perfect Attendance', description: '100% attendance in January', date: '2024-01-31' },
      ],
    },
  };
  return students[id as keyof typeof students];
};

const StudentProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = id ? getStudentById(id) : null;

  if (!student) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">Student not found</p>
          <Button onClick={() => navigate('/teacher/students')} className="mt-4">
            Back to Students
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      excellent: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      good: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      average: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'needs-attention': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return variants[performance as keyof typeof variants] || variants.average;
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/teacher/students')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Student Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View detailed information about the student
            </p>
          </div>
        </div>

        {/* Profile Overview */}
        <Card className="dark:bg-[#1E293B] dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-3xl">
                    {student.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {student.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {student.class} - Section {student.section}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Roll No: {student.rollNumber}
                  </p>
                  <Badge className={`mt-2 ${getPerformanceBadge(student.performance)}`}>
                    {student.performance.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      DOB: {new Date(student.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{student.address}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Parent/Guardian</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.parentName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{student.parentPhone}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(student.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{student.overallProgress}%</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
              <Progress value={student.overallProgress} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                  <p className="text-3xl font-bold text-green-600">{student.attendance}%</p>
                </div>
                <CheckCircle2 className="h-12 w-12 text-green-600 opacity-20" />
              </div>
              <Progress value={student.attendance} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subjects</p>
                  <p className="text-3xl font-bold text-purple-600">{student.subjects.length}</p>
                </div>
                <BookOpen className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="dark:bg-[#1E293B]">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <Card className="dark:bg-[#1E293B] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-lg dark:border-gray-700 dark:bg-[#0F172A]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {subject.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Teacher: {subject.teacher}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          Grade: {subject.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={subject.progress} className="flex-1 h-2" />
                        <span className="text-sm font-semibold text-blue-600">
                          {subject.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="dark:bg-[#1E293B] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 border rounded-lg dark:border-gray-700 dark:bg-[#0F172A]"
                    >
                      <div className="flex-shrink-0">
                        {activity.status === 'completed' ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="dark:bg-[#1E293B] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Achievements & Awards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 border rounded-lg dark:border-gray-700 dark:bg-[#0F172A]"
                    >
                      <Award className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="btn-primary-gradient">
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button 
            variant="outline" 
            className="dark:border-gray-700 dark:text-gray-200"
            onClick={() => handleDownloadReport(student)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfileView;
