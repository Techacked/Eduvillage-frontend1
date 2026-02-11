import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BookOpen,
  Calculator,
  Leaf,
  FlaskConical,
  Globe,
  Atom,
  TrendingUp,
  Briefcase,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  chapters: number;
  description: string;
}

interface ClassCategory {
  id: string;
  name: string;
  range: string;
  subjects: Subject[];
  stream?: string;
}

const primaryClasses: ClassCategory[] = [
  {
    id: 'class-1',
    name: 'Class 1',
    range: 'Primary',
    subjects: [
      { id: 'math-1', name: 'Mathematics', icon: Calculator, chapters: 12, description: 'Numbers, Addition, Subtraction basics' },
      { id: 'evs-1', name: 'EVS', icon: Leaf, chapters: 10, description: 'My Family, Plants, Animals, Our Body' },
    ],
  },
  {
    id: 'class-2',
    name: 'Class 2',
    range: 'Primary',
    subjects: [
      { id: 'math-2', name: 'Mathematics', icon: Calculator, chapters: 14, description: 'Numbers up to 100, Shapes, Time' },
      { id: 'evs-2', name: 'EVS', icon: Leaf, chapters: 12, description: 'Food, Water, Shelter, Seasons' },
    ],
  },
  {
    id: 'class-3',
    name: 'Class 3',
    range: 'Primary',
    subjects: [
      { id: 'math-3', name: 'Mathematics', icon: Calculator, chapters: 14, description: 'Multiplication, Division, Fractions' },
      { id: 'evs-3', name: 'EVS', icon: Leaf, chapters: 14, description: 'Living Things, Transport, Houses' },
    ],
  },
  {
    id: 'class-4',
    name: 'Class 4',
    range: 'Primary',
    subjects: [
      { id: 'math-4', name: 'Mathematics', icon: Calculator, chapters: 14, description: 'Large Numbers, Geometry, Patterns' },
      { id: 'evs-4', name: 'EVS', icon: Leaf, chapters: 14, description: 'Human Body, States of India, Resources' },
    ],
  },
  {
    id: 'class-5',
    name: 'Class 5',
    range: 'Primary',
    subjects: [
      { id: 'math-5', name: 'Mathematics', icon: Calculator, chapters: 14, description: 'Decimals, Percentages, Area & Perimeter' },
      { id: 'science-5', name: 'Science', icon: FlaskConical, chapters: 15, description: 'Matter, Energy, Ecosystem' },
    ],
  },
];

const middleClasses: ClassCategory[] = [
  {
    id: 'class-6',
    name: 'Class 6',
    range: 'Middle School',
    subjects: [
      { id: 'math-6', name: 'Mathematics', icon: Calculator, chapters: 14, description: 'Integers, Algebra, Ratio & Proportion' },
      { id: 'science-6', name: 'Science', icon: FlaskConical, chapters: 16, description: 'Food, Materials, Living World' },
      { id: 'social-6', name: 'Social Science', icon: Globe, chapters: 24, description: 'History, Geography, Civics' },
    ],
  },
  {
    id: 'class-7',
    name: 'Class 7',
    range: 'Middle School',
    subjects: [
      { id: 'math-7', name: 'Mathematics', icon: Calculator, chapters: 15, description: 'Rational Numbers, Triangles, Data Handling' },
      { id: 'science-7', name: 'Science', icon: FlaskConical, chapters: 18, description: 'Nutrition, Heat, Motion, Acids & Bases' },
      { id: 'social-7', name: 'Social Science', icon: Globe, chapters: 26, description: 'Medieval History, Environment, Democracy' },
    ],
  },
  {
    id: 'class-8',
    name: 'Class 8',
    range: 'Middle School',
    subjects: [
      { id: 'math-8', name: 'Mathematics', icon: Calculator, chapters: 16, description: 'Linear Equations, Quadrilaterals, Mensuration' },
      { id: 'science-8', name: 'Science', icon: FlaskConical, chapters: 18, description: 'Microorganisms, Force, Sound, Light' },
      { id: 'social-8', name: 'Social Science', icon: Globe, chapters: 28, description: 'Modern History, Resources, Constitution' },
    ],
  },
  {
    id: 'class-9',
    name: 'Class 9',
    range: 'Secondary',
    subjects: [
      { id: 'math-9', name: 'Mathematics', icon: Calculator, chapters: 15, description: 'Polynomials, Coordinate Geometry, Statistics' },
      { id: 'science-9', name: 'Science', icon: FlaskConical, chapters: 15, description: 'Matter, Atoms, Tissues, Motion, Work' },
      { id: 'social-9', name: 'Social Science', icon: Globe, chapters: 25, description: 'French Revolution, India Geography, Economics' },
    ],
  },
  {
    id: 'class-10',
    name: 'Class 10',
    range: 'Secondary',
    subjects: [
      { id: 'math-10', name: 'Mathematics', icon: Calculator, chapters: 15, description: 'Real Numbers, Trigonometry, Probability' },
      { id: 'science-10', name: 'Science', icon: FlaskConical, chapters: 16, description: 'Chemical Reactions, Life Processes, Electricity' },
      { id: 'social-10', name: 'Social Science', icon: Globe, chapters: 24, description: 'Nationalism, Development, Power Sharing' },
    ],
  },
];

const seniorSecondaryClasses: ClassCategory[] = [
  {
    id: 'class-11-pcm',
    name: 'Class 11',
    range: 'Senior Secondary',
    stream: 'PCM (Physics, Chemistry, Maths)',
    subjects: [
      { id: 'physics-11', name: 'Physics', icon: Atom, chapters: 15, description: 'Mechanics, Thermodynamics, Waves' },
      { id: 'chemistry-11', name: 'Chemistry', icon: FlaskConical, chapters: 14, description: 'Atomic Structure, Chemical Bonding, States of Matter' },
      { id: 'math-11', name: 'Mathematics', icon: Calculator, chapters: 16, description: 'Sets, Trigonometry, Calculus, Probability' },
    ],
  },
  {
    id: 'class-11-pcb',
    name: 'Class 11',
    range: 'Senior Secondary',
    stream: 'PCB (Physics, Chemistry, Biology)',
    subjects: [
      { id: 'physics-11-pcb', name: 'Physics', icon: Atom, chapters: 15, description: 'Mechanics, Thermodynamics, Waves' },
      { id: 'chemistry-11-pcb', name: 'Chemistry', icon: FlaskConical, chapters: 14, description: 'Atomic Structure, Chemical Bonding, States of Matter' },
      { id: 'biology-11', name: 'Biology', icon: Leaf, chapters: 22, description: 'Cell Biology, Plant Physiology, Human Physiology' },
    ],
  },
  {
    id: 'class-11-commerce',
    name: 'Class 11',
    range: 'Senior Secondary',
    stream: 'Commerce',
    subjects: [
      { id: 'accountancy-11', name: 'Accountancy', icon: TrendingUp, chapters: 16, description: 'Introduction to Accounting, Financial Statements' },
      { id: 'business-11', name: 'Business Studies', icon: Briefcase, chapters: 12, description: 'Nature of Business, Forms of Business Organizations' },
      { id: 'economics-11', name: 'Economics', icon: TrendingUp, chapters: 20, description: 'Indian Economic Development, Statistics' },
    ],
  },
  {
    id: 'class-12-pcm',
    name: 'Class 12',
    range: 'Senior Secondary',
    stream: 'PCM (Physics, Chemistry, Maths)',
    subjects: [
      { id: 'physics-12', name: 'Physics', icon: Atom, chapters: 14, description: 'Electrostatics, Optics, Modern Physics' },
      { id: 'chemistry-12', name: 'Chemistry', icon: FlaskConical, chapters: 16, description: 'Electrochemistry, Organic Chemistry, Polymers' },
      { id: 'math-12', name: 'Mathematics', icon: Calculator, chapters: 13, description: 'Relations, Calculus, Vectors, Linear Programming' },
    ],
  },
  {
    id: 'class-12-pcb',
    name: 'Class 12',
    range: 'Senior Secondary',
    stream: 'PCB (Physics, Chemistry, Biology)',
    subjects: [
      { id: 'physics-12-pcb', name: 'Physics', icon: Atom, chapters: 14, description: 'Electrostatics, Optics, Modern Physics' },
      { id: 'chemistry-12-pcb', name: 'Chemistry', icon: FlaskConical, chapters: 16, description: 'Electrochemistry, Organic Chemistry, Polymers' },
      { id: 'biology-12', name: 'Biology', icon: Leaf, chapters: 16, description: 'Genetics, Evolution, Biotechnology, Ecology' },
    ],
  },
  {
    id: 'class-12-commerce',
    name: 'Class 12',
    range: 'Senior Secondary',
    stream: 'Commerce',
    subjects: [
      { id: 'accountancy-12', name: 'Accountancy', icon: TrendingUp, chapters: 10, description: 'Partnership Accounts, Company Accounts' },
      { id: 'business-12', name: 'Business Studies', icon: Briefcase, chapters: 12, description: 'Management, Marketing, Financial Management' },
      { id: 'economics-12', name: 'Economics', icon: TrendingUp, chapters: 12, description: 'Macroeconomics, Indian Economy' },
    ],
  },
];

const SchoolCourses: React.FC = () => {
  const navigate = useNavigate();

  const handleSubjectClick = (classId: string, subjectId: string) => {
    // TODO: connect to backend API
    navigate(`/courses/${subjectId}`);
  };

  const renderClassSection = (title: string, classes: ClassCategory[], badgeColor: string) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Badge variant="secondary" className={badgeColor}>
          {classes.length} Classes
        </Badge>
      </div>
      
      <Accordion type="single" collapsible className="space-y-2">
        {classes.map((classItem) => (
          <AccordionItem
            key={classItem.id}
            value={classItem.id}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{classItem.name}</p>
                  {classItem.stream && (
                    <p className="text-sm text-muted-foreground">{classItem.stream}</p>
                  )}
                </div>
                <Badge variant="outline" className="ml-2">
                  {classItem.subjects.length} Subjects
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {classItem.subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
                    onClick={() => handleSubjectClick(classItem.id, subject.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <subject.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{subject.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {subject.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {subject.chapters} Chapters
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            School Courses
          </h1>
          <p className="text-muted-foreground">
            Complete curriculum from Class 1 to Class 12 with all subjects
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Chapters</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Streams</p>
            </CardContent>
          </Card>
        </div>

        {/* Scrollable Course List */}
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="pr-4">
            {renderClassSection('Primary Classes (1-5)', primaryClasses, 'bg-green-100 text-green-700')}
            {renderClassSection('Middle & Secondary Classes (6-10)', middleClasses, 'bg-blue-100 text-blue-700')}
            {renderClassSection('Senior Secondary Classes (11-12)', seniorSecondaryClasses, 'bg-purple-100 text-purple-700')}
          </div>
        </ScrollArea>
      </div>
    </DashboardLayout>
  );
};

export default SchoolCourses;
