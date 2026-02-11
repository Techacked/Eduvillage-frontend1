import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Progress from "./pages/Progress";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./pages/EnrolledCourses";
import CreateCourse from "./pages/CreateCourse";
import Assessment from "./pages/Assessment";
import SchoolCourses from "./pages/SchoolCourses";
import Assignments from "./pages/Assignments";
import Community from "./pages/Community";
import Notifications  from "./pages/Notifications";   // named export
import UsersManagement from "./pages/UsersManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import TeacherStudents from "./pages/TeacherStudents";
import StudentProfileView from "./pages/StudentProfileView";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/progress" element={<Progress />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/create-course" element={<CreateCourse />} />
              <Route path="/manage-courses" element={<Courses />} />
              <Route path="/school-courses" element={<SchoolCourses />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/assessments" element={<Assessment />} />
              <Route path="/community" element={<Community />} />
              <Route path="/notifications" element={<Notifications />} /> {/* ✅ working now */}
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/teacher/students" element={<TeacherStudents />} />
              <Route path="/student/:id" element={<StudentProfileView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
