import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Star, BookOpen, PlayCircle } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  studentsEnrolled: number;
  rating: number;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  progress?: number;
  isEnrolled?: boolean;
}

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'enrolled' | 'compact';
  onEnroll?: (course: Course) => void; // NEW - SAFE OPTIONAL ADDITION
}

const CourseCard: React.FC<CourseCardProps> = ({ course, variant = 'default', onEnroll }) => {
  const levelColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-warning/10 text-warning border-warning/20',
    Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  if (variant === 'compact') {
    return (
      <Link to={`/courses/${course.id}`} className="block">
        <div className="card-elevated p-4 hover:shadow-elevated transition-all duration-300 group">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
              {course.progress !== undefined && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'enrolled') {
    return (
      <div className="card-elevated overflow-hidden group">
        <div className="relative h-40 bg-muted">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
              {course.category}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{course.progress || 0}%</span>
            </div>
            <Progress value={course.progress || 0} className="h-2" />
          </div>
          
          <Link to={`/courses/${course.id}`}>
            <Button className="w-full mt-4" variant="secondary">
              <PlayCircle className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated overflow-hidden group">
      <div className="relative h-48 bg-muted">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={levelColors[course.level]}>
            {course.level}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {course.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/courses/${course.id}`}>
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Users className="h-4 w-4" />
          <span>{course.studentsEnrolled.toLocaleString()} students</span>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {course.price === 0 ? (
              <span className="text-lg font-bold text-success">Free</span>
            ) : (
              <span className="text-lg font-bold text-foreground">${course.price}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link to={`/courses/${course.id}`}>
              <Button size="sm" className="btn-primary-gradient">
                View Course
              </Button>
            </Link>
            {/* NEW - SAFE ADDITION: Enroll button if handler provided */}
            {onEnroll && !course.isEnrolled && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  onEnroll(course);
                }}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
