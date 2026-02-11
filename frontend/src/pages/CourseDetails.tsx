import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/context/AuthContext';
import {
  Star,
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Globe,
  Award,
  FileText,
  Download,
  Share2,
  CreditCard,
  ShoppingCart,
} from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const CourseDetails: React.FC = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/courses/${id}`);
      if (!res.ok) throw new Error('Failed to fetch course');
      return res.json();
    },
    enabled: !!id
  });

  const handleEnroll = async () => {
    if (!id) return;
    try {
      const res = await fetch(`${API_BASE}/api/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: id }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to enroll');
      const data = await res.json();
      setIsEnrolled(true);
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast.success('Successfully enrolled in the course!');
    } catch (err: any) {
      toast.error(err?.message || 'Enrollment failed');
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase this course');
      return;
    }
    await handleEnroll();
  };

  const handleAddToCart = () => {
    toast.info('Course added to cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="bg-primary-foreground/20 text-primary-foreground mb-4">
                {course?.category ?? 'School Course'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {course?.title ?? 'Course Title'}
              </h1>
              <p className="text-lg opacity-90 mb-6">
                {course?.description ?? ''}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-semibold">{course?.rating ?? 0}</span>
                  <span className="opacity-70">({(course?.reviewsCount || 0).toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5" />
                  <span>{(course?.studentsEnrolled || 0).toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center font-semibold text-lg">
                  {course?.instructor?.avatar ?? ''}
                </div>
                <div>
                  <p className="font-medium">Created by {course?.instructor?.name ?? 'Instructor'}</p>
                  <p className="text-sm opacity-70">{course?.instructor?.title ?? ''}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Last updated {course?.lastUpdated ?? ''}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {course?.language ?? ''}
                </span>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6 sticky top-24">
                <div className="relative rounded-lg overflow-hidden mb-6">
                  <img
                    src={course?.thumbnail ?? ''}
                    alt={course?.title ?? 'Course'}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                    <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                      <PlayCircle className="h-8 w-8 text-primary-foreground ml-1" />
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {course?.price === 0 ? 'Free' : `$${course?.price ?? 0}`}
                  </span>
                  {course?.originalPrice && course.originalPrice > (course.price ?? 0) && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                  {course?.originalPrice && course.originalPrice > (course.price ?? 0) && (
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                      {Math.round((1 - (course.price ?? 0) / course.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {isEnrolled ? (
                  <Link to={`/courses/${id}/learn`}>
                    <Button className="w-full btn-primary-gradient mb-3" size="lg">
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <div className="flex gap-3 mb-3">
                    <Button
                      className="flex-1 btn-primary-gradient"
                      size="lg"
                      onClick={handleBuyNow}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                )}

                <div className="flex gap-2 mb-6">
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="font-medium text-foreground">This course includes:</p>
                  {(course?.features || [
                    `${course?.totalLessons || 0} lessons`,
                    'Interactive content',
                    'Progress tracking',
                    'Certificate of completion',
                    'Lifetime access'
                  ]).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="curriculum" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        What you'll learn
                      </h2>
                      <div className="grid md:grid-cols-2 gap-3">
                        {(course?.learnings || course?.subjects?.map(subject => `Master ${subject} concepts`) || [
                          'Comprehensive curriculum coverage',
                          'Interactive learning materials',
                          'Progress tracking and assessment',
                          'Certificate upon completion'
                        ]).map((learning, index) => (
                          <div key={index} className="flex gap-3">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{learning}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        Requirements
                      </h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>No programming experience needed - we'll teach you everything from scratch</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>A computer with internet access (Windows, Mac, or Linux)</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>No paid software required - all tools used are free</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Course Content</h2>
                    <p className="text-sm text-muted-foreground">
                      {course?.subjects?.length || 0} subjects • {course?.totalLessons || 0} lessons
                    </p>
                  </div>

                  <Accordion type="multiple" className="space-y-2">
                    {(course?.curriculum || course?.subjects?.map((subject, index) => ({
                      title: subject,
                      duration: `${Math.ceil((course.totalLessons || 0) / (course.subjects?.length || 1))} lessons`,
                      lessons: Array.from({ length: Math.ceil((course.totalLessons || 0) / (course.subjects?.length || 1)) }, (_, i) => ({
                        title: `${subject} Lesson ${i + 1}`,
                        duration: '10:00',
                        isPreview: i === 0
                      }))
                    })) || []).map((section, sectionIndex) => (
                      <AccordionItem
                        key={sectionIndex}
                        value={`section-${sectionIndex}`}
                        className="card-elevated px-0"
                      >
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="font-medium">{section.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {section.lessons?.length || 0} lessons • {section.duration}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            {section.lessons?.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{lesson.title}</span>
                                  {lesson.isPreview && (
                                    <Badge variant="outline" className="text-xs">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <div className="card-elevated p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                        {course?.instructor?.avatar || course?.instructor?.name?.charAt(0) || 'I'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground">
                          {course?.instructor?.name || 'School Instructor'}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {course?.instructor?.title || 'Certified Teacher'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning" />
                            {course?.instructor?.rating || course?.rating || 0} Instructor Rating
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {course?.instructor?.courses || 1} Courses
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {(course?.instructor?.students || course?.studentsEnrolled || 0).toLocaleString()} Students
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {course?.instructor?.bio || 'Experienced educator dedicated to providing quality education for students.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="card-elevated p-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-foreground">{course?.rating || 0}</p>
                        <div className="flex items-center gap-1 my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {(course?.reviewsCount || 0).toLocaleString()} reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm w-3">{star}</span>
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <Progress value={star === 5 ? 78 : star === 4 ? 15 : 5} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground w-10">
                              {star === 5 ? '78%' : star === 4 ? '15%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-muted-foreground">
                      Reviews will be displayed here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetails;
