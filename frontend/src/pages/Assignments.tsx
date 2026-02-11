import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  RefreshCw,
  BookOpen,
  Target,
  Award,
  IndianRupee,
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  totalQuestions: number;
  timeLimit: number;
  passingScore: number;
  prize: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const availableAssignments: Assignment[] = [
  { id: 'math-1', title: 'Basic Arithmetic Quiz', subject: 'Mathematics', class: 'Class 3', totalQuestions: 10, timeLimit: 10, passingScore: 70, prize: 50, difficulty: 'Easy' },
  { id: 'math-2', title: 'Fractions & Decimals', subject: 'Mathematics', class: 'Class 5', totalQuestions: 10, timeLimit: 15, passingScore: 70, prize: 100, difficulty: 'Medium' },
  { id: 'math-3', title: 'Algebra Fundamentals', subject: 'Mathematics', class: 'Class 8', totalQuestions: 10, timeLimit: 20, passingScore: 70, prize: 150, difficulty: 'Medium' },
  { id: 'math-4', title: 'Trigonometry Challenge', subject: 'Mathematics', class: 'Class 10', totalQuestions: 10, timeLimit: 25, passingScore: 70, prize: 250, difficulty: 'Hard' },
  { id: 'science-1', title: 'Living World Quiz', subject: 'Science', class: 'Class 6', totalQuestions: 10, timeLimit: 12, passingScore: 70, prize: 75, difficulty: 'Easy' },
  { id: 'science-2', title: 'Physics Basics', subject: 'Science', class: 'Class 9', totalQuestions: 10, timeLimit: 20, passingScore: 70, prize: 200, difficulty: 'Medium' },
  { id: 'social-1', title: 'Indian History Quiz', subject: 'Social Science', class: 'Class 7', totalQuestions: 10, timeLimit: 15, passingScore: 70, prize: 100, difficulty: 'Easy' },
  { id: 'chem-1', title: 'Organic Chemistry', subject: 'Chemistry', class: 'Class 12', totalQuestions: 10, timeLimit: 30, passingScore: 70, prize: 500, difficulty: 'Hard' },
];

// Question banks for auto-refresh
const questionBanks: { [key: string]: Question[][] } = {
  'math-1': [
    [
      { id: 1, question: 'What is 5 + 3?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
      { id: 2, question: 'What is 12 - 4?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
      { id: 3, question: 'What is 3 × 4?', options: ['10', '11', '12', '13'], correctAnswer: 2 },
      { id: 4, question: 'What is 20 ÷ 5?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
      { id: 5, question: 'What is 15 + 7?', options: ['20', '21', '22', '23'], correctAnswer: 2 },
    ],
    [
      { id: 1, question: 'What is 9 + 6?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
      { id: 2, question: 'What is 18 - 9?', options: ['7', '8', '9', '10'], correctAnswer: 2 },
      { id: 3, question: 'What is 6 × 3?', options: ['15', '16', '17', '18'], correctAnswer: 3 },
      { id: 4, question: 'What is 24 ÷ 6?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
      { id: 5, question: 'What is 11 + 8?', options: ['17', '18', '19', '20'], correctAnswer: 2 },
    ],
  ],
  'math-2': [
    [
      { id: 1, question: 'What is 0.5 + 0.25?', options: ['0.65', '0.70', '0.75', '0.80'], correctAnswer: 2 },
      { id: 2, question: 'Convert 3/4 to decimal', options: ['0.25', '0.50', '0.75', '1.00'], correctAnswer: 2 },
      { id: 3, question: 'What is 1/2 + 1/4?', options: ['1/4', '2/4', '3/4', '4/4'], correctAnswer: 2 },
      { id: 4, question: 'What is 2.5 × 2?', options: ['4.0', '4.5', '5.0', '5.5'], correctAnswer: 2 },
      { id: 5, question: 'Simplify 6/8', options: ['1/2', '2/3', '3/4', '4/5'], correctAnswer: 2 },
    ],
  ],
  'science-1': [
    [
      { id: 1, question: 'Which organ pumps blood in the body?', options: ['Brain', 'Heart', 'Lungs', 'Kidney'], correctAnswer: 1 },
      { id: 2, question: 'What is the largest organ of the human body?', options: ['Heart', 'Brain', 'Skin', 'Liver'], correctAnswer: 2 },
      { id: 3, question: 'Plants make food through which process?', options: ['Respiration', 'Digestion', 'Photosynthesis', 'Excretion'], correctAnswer: 2 },
      { id: 4, question: 'Which gas do plants release during photosynthesis?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctAnswer: 2 },
      { id: 5, question: 'How many bones are in the adult human body?', options: ['106', '156', '206', '256'], correctAnswer: 2 },
    ],
  ],
};

// Generate random questions for assignments without specific banks
const generateRandomQuestions = (count: number): Question[] => {
  const baseQuestions: Question[] = [
    { id: 1, question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], correctAnswer: 1 },
    { id: 2, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
    { id: 3, question: 'What is H2O commonly known as?', options: ['Salt', 'Sugar', 'Water', 'Oil'], correctAnswer: 2 },
    { id: 4, question: 'Who wrote Romeo and Juliet?', options: ['Charles Dickens', 'Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 1 },
    { id: 5, question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2 },
    { id: 6, question: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2 },
    { id: 7, question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: 2 },
    { id: 8, question: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2 },
    { id: 9, question: 'Which gas do we breathe in?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correctAnswer: 1 },
    { id: 10, question: 'What is 25% of 200?', options: ['25', '50', '75', '100'], correctAnswer: 1 },
  ];
  
  // Shuffle and return required count
  const shuffled = [...baseQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((q, index) => ({ ...q, id: index + 1 }));
};

const Assignments: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attemptKey, setAttemptKey] = useState(0);

  const loadQuestions = useCallback((assignment: Assignment) => {
    const bank = questionBanks[assignment.id];
    if (bank && bank.length > 0) {
      // Pick a random set from the bank
      const randomSetIndex = Math.floor(Math.random() * bank.length);
      setQuestions(bank[randomSetIndex]);
    } else {
      // Generate random questions
      setQuestions(generateRandomQuestions(assignment.totalQuestions));
    }
  }, []);

  const startAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setCurrentQuestion(0);
    setAnswers({});
    setIsSubmitted(false);
    setTimeRemaining(assignment.timeLimit * 60);
    setAttemptKey(prev => prev + 1);
    loadQuestions(assignment);
  };

  const restartAssignment = () => {
    if (selectedAssignment) {
      startAssignment(selectedAssignment);
      toast.info('Assignment restarted with new questions!');
    }
  };

  const backToList = () => {
    setSelectedAssignment(null);
    setQuestions([]);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (selectedAssignment && !isSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedAssignment, isSubmitted, timeRemaining]);

  const question = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleAnswer = (answerIndex: number) => {
    if (question) {
      setAnswers({ ...answers, [question.id]: answerIndex });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast.success('Assignment submitted successfully!');
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Assignment Selection Screen
  if (!selectedAssignment) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Assignments
            </h1>
            <p className="text-muted-foreground">
              Choose an assignment to attempt. Questions auto-refresh on each retry!
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pr-4">
              {availableAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                  onClick={() => startAssignment(assignment)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <Badge
                        variant={
                          assignment.difficulty === 'Easy'
                            ? 'secondary'
                            : assignment.difficulty === 'Medium'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {assignment.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{assignment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Subject</span>
                        <span className="font-medium text-foreground">{assignment.subject}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Class</span>
                        <span className="font-medium text-foreground">{assignment.class}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Questions</span>
                        <span className="font-medium text-foreground">{assignment.totalQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Time Limit</span>
                        <span className="font-medium text-foreground">{assignment.timeLimit} mins</span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-2 mt-2">
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          Prize
                        </span>
                        <span className="font-bold text-primary flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {assignment.prize}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 btn-primary-gradient">
                      <Target className="h-4 w-4 mr-2" />
                      Start Assignment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DashboardLayout>
    );
  }

  // Results Screen
  if (isSubmitted) {
    const score = calculateScore();
    const passed = score >= selectedAssignment.passingScore;
    const prizeWon = passed ? selectedAssignment.prize : 0;

    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="card-elevated p-8 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-success/10' : 'bg-destructive/10'
            }`}>
              {passed ? (
                <Trophy className="h-12 w-12 text-success" />
              ) : (
                <AlertCircle className="h-12 w-12 text-destructive" />
              )}
            </div>
            
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {passed
                ? "You've passed the assignment!"
                : "You didn't pass this time, but you can try again with new questions."}
            </p>

            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{score}%</p>
                <p className="text-sm text-muted-foreground">Your Score</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{selectedAssignment.passingScore}%</p>
                <p className="text-sm text-muted-foreground">Passing Score</p>
              </div>
            </div>

            {passed && (
              <div className="bg-success/10 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-success">
                  <Award className="h-6 w-6" />
                  <span className="text-xl font-bold">Prize Won:</span>
                  <span className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-5 w-5" />
                    {prizeWon}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={backToList}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Assignments
              </Button>
              <Button onClick={restartAssignment} className="btn-primary-gradient">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again (New Questions)
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Quiz Screen
  if (!question) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="card-elevated p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {selectedAssignment.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedAssignment.subject} • {selectedAssignment.class}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTime(timeRemaining)}
              </Badge>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                {selectedAssignment.prize} Prize
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        {/* Question */}
        <div className="card-elevated p-8">
          <h2 className="text-xl font-medium text-foreground mb-6">
            {question.question}
          </h2>

          <RadioGroup
            key={`${attemptKey}-${question.id}`}
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswer(parseInt(value))}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  answers[question.id] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAnswer(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-primary text-primary-foreground'
                      : answers[questions[index].id] !== undefined
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <Button className="btn-primary-gradient" onClick={handleSubmit}>
                Submit Assignment
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
