import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, BookOpen, DollarSign, TrendingUp, Eye, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 4500, students: 4000, teachers: 500 },
  { month: 'Feb', users: 5200, students: 4600, teachers: 600 },
  { month: 'Mar', users: 6100, students: 5400, teachers: 700 },
  { month: 'Apr', users: 7300, students: 6500, teachers: 800 },
  { month: 'May', users: 8800, students: 7800, teachers: 1000 },
  { month: 'Jun', users: 10500, students: 9300, teachers: 1200 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 61000 },
  { month: 'Apr', revenue: 73000 },
  { month: 'May', revenue: 88000 },
  { month: 'Jun', revenue: 95000 },
];

const courseEnrollmentData = [
  { name: 'Web Development', value: 35, color: '#2563eb' },
  { name: 'Data Science', value: 25, color: '#16a34a' },
  { name: 'Design', value: 20, color: '#dc2626' },
  { name: 'Marketing', value: 12, color: '#eab308' },
  { name: 'Business', value: 8, color: '#8b5cf6' },
];

const topCourses = [
  { name: 'Complete Web Development Bootcamp', enrollments: 12500, revenue: '$24,500' },
  { name: 'Data Science Masterclass', enrollments: 8900, revenue: '$17,800' },
  { name: 'UI/UX Design Fundamentals', enrollments: 6700, revenue: '$13,400' },
  { name: 'Digital Marketing Course', enrollments: 4200, revenue: '$8,400' },
  { name: 'Python for Beginners', enrollments: 3800, revenue: '$7,600' },
];

const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Platform Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor platform performance and growth metrics
            </p>
          </div>
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="52,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Courses"
            value="1,248"
            icon={BookOpen}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Monthly Revenue"
            value="$95,000"
            icon={DollarSign}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Avg. Session"
            value="24 min"
            icon={Clock}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="teachers"
                    stackId="1"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={courseEnrollmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseEnrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{course.name}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-muted-foreground">
                        {course.enrollments.toLocaleString()} students
                      </span>
                      <span className="font-semibold text-success">{course.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
