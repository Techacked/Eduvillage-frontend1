import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import {
  Upload,
  Plus,
  X,
  Video,
  FileText,
  Link as LinkIcon,
  GripVertical,
  Trash2,
  Save,
  Eye,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'link';
  duration?: string;
  content?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Introduction',
      lessons: [
        { id: '1-1', title: 'Welcome to the Course', type: 'video', duration: '5:00' },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: 'New Section',
        lessons: [],
      },
    ]);
  };

  const addLesson = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: `${sectionId}-${Date.now()}`,
                  title: 'New Lesson',
                  type: 'video',
                },
              ],
            }
          : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : section
      )
    );
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, title } : section
      )
    );
  };

  const updateLesson = (sectionId: string, lessonId: string, updates: Partial<Lesson>) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              ),
            }
          : section
      )
    );
  };

  const handleSave = async (isDraft: boolean) => {
    // Validation
    if (!title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a course title',
        variant: 'destructive',
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a course description',
        variant: 'destructive',
      });
      return;
    }

    if (!category) {
      toast({
        title: 'Validation Error',
        description: 'Please select a category',
        variant: 'destructive',
      });
      return;
    }

    if (!level) {
      toast({
        title: 'Validation Error',
        description: 'Please select a difficulty level',
        variant: 'destructive',
      });
      return;
    }

    if (isDraft) {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
    }

    try {
      // Prepare course data
      const courseData = {
        title: title.trim(),
        description: description.trim(),
        category,
        level,
        price: parseFloat(price) || 0,
        thumbnail: thumbnailPreview || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        sections: sections.map(section => ({
          title: section.title,
          lessons: section.lessons.map(lesson => ({
            title: lesson.title,
            type: lesson.type,
            duration: lesson.duration || '10:00',
            content: lesson.content || '',
          })),
        })),
        status: isDraft ? 'draft' : 'published',
        instructor: 'Current Teacher', // Will be set by backend
        studentsEnrolled: 0,
        rating: 0,
        lessonsCount: sections.reduce((total, section) => total + section.lessons.length, 0),
        duration: `${sections.reduce((total, section) => total + section.lessons.length, 0) * 10} hours`,
      };

      // Call API using centralized api helper
      const data = await api.courses.create(courseData);

      toast({
        title: 'Success!',
        description: isDraft 
          ? 'Course saved as draft successfully' 
          : 'Course published successfully!',
      });

      // Show success message with icon
      setTimeout(() => {
        toast({
          title: isDraft ? '📝 Draft Saved' : '🎉 Course Published!',
          description: isDraft 
            ? 'You can continue editing your course anytime' 
            : 'Your course is now live and available to students',
        });
      }, 500);

      // Redirect to teacher dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/teacher');
      }, 2000);

    } catch (error: any) {
      console.error('Error saving course:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save course. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Create New Course
            </h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details below to create your course
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave(true)}
              disabled={isSaving || isPublishing}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </>
              )}
            </Button>
            <Button 
              className="btn-primary-gradient" 
              onClick={() => handleSave(false)}
              disabled={isSaving || isPublishing}
            >
              {isPublishing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Publish Course
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g., Complete Web Development Bootcamp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="social-studies">Social Studies</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0 for free"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Recommended: 1280x720 pixels (16:9 ratio)
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleThumbnailChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Course Curriculum</h2>
            <Button variant="outline" size="sm" onClick={addSection}>
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>

          <div className="space-y-4">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="border border-border rounded-lg overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center gap-3 p-4 bg-muted/50">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <Input
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    className="flex-1 font-medium"
                  />
                  <Badge variant="secondary">{section.lessons.length} lessons</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSection(section.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Lessons */}
                <div className="p-4 space-y-2">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {getLessonIcon(lesson.type)}
                      </div>
                      <Input
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(section.id, lesson.id, { title: e.target.value })
                        }
                        className="flex-1"
                        placeholder="Lesson title"
                      />
                      <Select
                        value={lesson.type}
                        onValueChange={(value: 'video' | 'pdf' | 'link') =>
                          updateLesson(section.id, lesson.id, { type: value })
                        }
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLesson(section.id, lesson.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => addLesson(section.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
