import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid, List } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const categories = ["All", "Primary", "Middle", "Senior Secondary"];
const levels = [
  "All Levels",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];
const sortOptions = [
  "Most Popular",
  "Highest Rated",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

const Courses: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch backend courses
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  // 🔥 Auto-generate Class 1–12 School Courses
  const generatedSchoolCourses = Array.from({ length: 12 }, (_, index) => {
    const classNum = index + 1;
    return {
      id: `auto-${classNum}`,
      classNumber: classNum,
      title: `Class ${classNum}`,
      subjects: ["Maths", "Science", "English"],
      totalLessons: 40,
      stream: "",
      color: "#3b82f6",
      price: 50 + index * 5, // Class 1 → 50, Class 12 → 105
    };
  });

  // Combine with backend courses
  const schoolCourses = [
    ...generatedSchoolCourses,
    ...(courses || []).filter(
      (c: any) =>
        c.classNumber >= 1 &&
        c.classNumber <= 12 &&
        (c.category === "School Course" || !c.category)
    ),
  ];

  // Apply search + filter logic
  const filteredCourses = schoolCourses.filter((course: any) => {
    const label = `Class ${course.classNumber}`;
    const subjectsStr = (course.subjects || []).join(" ");

    const matchesSearch =
      label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subjectsStr.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Primary" && course.classNumber <= 5) ||
      (selectedCategory === "Middle" &&
        course.classNumber >= 6 &&
        course.classNumber <= 10) ||
      (selectedCategory === "Senior Secondary" &&
        course.classNumber >= 11);

    const matchesLevel =
      selectedLevel === "All Levels" ||
      selectedLevel === `Class ${course.classNumber}`;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Button handlers
  const handleEnroll = (course: any) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/course/${course.classNumber}`);
  };

  const handleAddToCart = (course: any) => {
    addToCart(course);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={isAuthenticated ? "flex" : ""}>
        {isAuthenticated && <Sidebar />}

        <main className={isAuthenticated ? "flex-1 ml-64" : ""}>
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Explore School Courses
              </h1>
              <p className="text-muted-foreground">
                Discover {filteredCourses.length}+ school courses from Class 1
                to Class 12
              </p>
            </div>

            {/* Search + Filters */}
            <div className="card-elevated p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Levels */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Courses Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredCourses.map((course: any, index: number) => (
                <div
                  key={course.id || index}
                  className="border rounded-xl p-5 shadow-md bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Class {course.classNumber}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Subjects: {(course.subjects || []).join(", ")}
                  </p>
                  <p className="font-bold text-blue-600 mb-4">
                    Price: ₹{course.price}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleEnroll(course)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                    >
                      Enroll Now
                    </Button>

                    <Button
                      onClick={() => handleAddToCart(course)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isAuthenticated && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Courses;
