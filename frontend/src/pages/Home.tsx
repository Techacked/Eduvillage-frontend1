import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClassCourseCard from '@/components/ClassCourseCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Globe,
  Shield,
} from 'lucide-react';

const stats = [
  { label: 'Active Students', value: '50,000+' },
  { label: 'Expert Instructors', value: '500+' },
  { label: 'Courses Available', value: '1,200+' },
  { label: 'Success Rate', value: '95%' },
];

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Courses',
    description: 'Learn from industry professionals with years of real-world experience.',
  },
  {
    icon: PlayCircle,
    title: 'Interactive Learning',
    description: 'Engage with video lessons, quizzes, and hands-on projects.',
  },
  {
    icon: Award,
    title: 'Certified Programs',
    description: 'Earn recognized certificates to boost your career prospects.',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with fellow learners and grow together.',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics.',
  },
  {
    icon: Globe,
    title: 'Learn Anywhere',
    description: 'Access courses on any device, anytime, anywhere.',
  },
];

import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const categories = [
  { name: 'Web Development', count: 245, color: 'bg-primary' },
  { name: 'Data Science', count: 189, color: 'bg-success' },
  { name: 'Business', count: 156, color: 'bg-warning' },
  { name: 'Design', count: 134, color: 'bg-destructive' },
  { name: 'Marketing', count: 98, color: 'bg-secondary-foreground' },
  { name: 'Photography', count: 76, color: 'bg-primary' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    avatar: 'S',
    content: 'EduVillage transformed my career. The courses are well-structured and the instructors are truly experts in their fields.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Data Analyst',
    avatar: 'M',
    content: 'The data science track helped me transition from a different career. Now I work at a top tech company!',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'UX Designer',
    avatar: 'E',
    content: 'Excellent platform with high-quality content. The community support made learning so much more enjoyable.',
    rating: 5,
  },
];

const Home: React.FC = () => {
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/courses`);
      if (!res.ok) throw new Error('Failed to fetch courses');
      return res.json();
    },
  });

  const schoolCourses = (courses || []).filter((course: any) => {
    return course.classNumber >= 1 && course.classNumber <= 12 && (course.category === 'School Course' || !course.category);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🎓 #1 Online Learning Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Unlock Your Potential with{' '}
                <span className="text-gradient">EduVillage</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Join thousands of learners worldwide and gain the skills you need to succeed. 
                Expert-led courses, flexible learning, and recognized certifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="btn-primary-gradient w-full sm:w-auto">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Explore School Courses
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold border-2 border-background"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by 50,000+ students
                  </p>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 hero-gradient rounded-3xl opacity-20 blur-2xl" />
                <div className="relative bg-card rounded-2xl border border-border p-8 shadow-elevated">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Featured Course</h3>
                      <p className="text-sm text-muted-foreground">
                        Full-Stack Web Development
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {['React & TypeScript', 'Node.js & Express', 'Database Design', 'Deployment'].map(
                      (topic, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-sm text-muted-foreground">(2.4k reviews)</span>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Bestseller
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources you need for an exceptional learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-elevated p-6 group hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Courses Section - Class 1 to 12 */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">School Curriculum</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Class 1 to 12 Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete NCERT-aligned courses for all school classes with expert teaching
            </p>
          </div>
          
          {/* Primary Classes (1-5) */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-success" />
              Primary Classes (1-5)
            </h3>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {schoolCourses.filter(c => c.classNumber <= 5).map((course, index) => (
                  <div key={index} className="min-w-[280px]">
                    <ClassCourseCard {...course} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Middle Classes (6-10) */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Middle & Secondary (6-10)
            </h3>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {schoolCourses.filter(c => c.classNumber >= 6 && c.classNumber <= 10).map((course, index) => (
                  <div key={index} className="min-w-[280px]">
                    <ClassCourseCard {...course} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Senior Secondary (11-12) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-warning" />
              Senior Secondary (11-12) - Streams
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolCourses.filter(c => c.classNumber >= 11).map((course, index) => (
                <ClassCourseCard key={index} {...course} />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/school-courses">
              <Button size="lg" className="btn-primary-gradient">
                View All School Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Browse Classes</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Explore School Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from classes 1 to 12 and start your learning journey today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schoolCourses.map((course, index) => (
              <ClassCourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our community of successful learners.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join EduVillage today and get access to thousands of courses from expert instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Certified Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span className="text-sm">Global Access</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
