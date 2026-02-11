import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

const BLUE = "#2563EB";
const BLUE_LIGHT = "#E8F0FE";
const PENDING = "#A5B4FC"; // lighter blue

const Progress = () => {
  const progress = [
    {
      course: "Class 10 - Mathematics",
      completed: 3,
      total: 10,
      topics: [
        { name: "Algebra Basics", done: true },
        { name: "Polynomials", done: true },
        { name: "Linear Equations", done: false },
        { name: "Quadratic Equations", done: false },
      ],
    },
    {
      course: "Class 10 - Science",
      completed: 1,
      total: 8,
      topics: [
        { name: "Chemical Reactions", done: true },
        { name: "Acids & Bases", done: false },
        { name: "Electricity", done: false },
      ],
    },
  ];

  // Bar chart data for overall progress
  const barChartData = progress.map((item) => ({
    name: item.course.split(" - ")[1],
    completed: item.completed,
    pending: item.total - item.completed,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto dark:bg-[#0F172A]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            Your Learning Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your course completion and achievements
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
                  <p className="text-3xl font-bold text-blue-600">{progress.length}</p>
                </div>
                <BookOpen className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed Topics</p>
                  <p className="text-3xl font-bold text-green-600">
                    {progress.reduce((sum, p) => sum + p.completed, 0)}
                  </p>
                </div>
                <CheckCircle2 className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Topics</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {progress.reduce((sum, p) => sum + (p.total - p.completed), 0)}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart Overview */}
        <Card className="mb-8 dark:bg-[#1E293B] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Course Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill={BLUE} name="Completed" />
                <Bar dataKey="pending" fill={PENDING} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Individual Course Progress */}
        {progress.map((item, i) => {
          const chartData = [
            { name: "Completed", value: item.completed },
            { name: "Pending", value: item.total - item.completed },
          ];
          const percentage = Math.round((item.completed / item.total) * 100);

          return (
            <Card key={i} className="mb-6 dark:bg-[#1E293B] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{item.course}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.completed} / {item.total} topics completed ({percentage}%)
                </p>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-6">
                  <ProgressBar value={percentage} className="h-3" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                      Completion Status
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill={BLUE} />
                          <Cell fill={PENDING} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Topics List */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                      Topics Overview
                    </h3>
                    <div className="space-y-3">
                      {item.topics.map((t, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            t.done
                              ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                              : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                          }`}
                        >
                          <span className="text-sm font-medium dark:text-white">
                            {t.name}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              t.done
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {t.done ? "✓ Completed" : "⏳ Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Progress;
