import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
} from 'lucide-react';

const assessmentData = {
  id: '1',
  title: 'JavaScript Fundamentals Quiz',
  course: 'Complete Web Development Bootcamp',
  totalQuestions: 10,
  timeLimit: 15, // minutes
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: [
        'variable x = 5;',
        'var x = 5;',
        'v x = 5;',
        'int x = 5;',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: 'Which method is used to add an element to the end of an array?',
      options: [
        'push()',
        'append()',
        'addEnd()',
        'insert()',
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'What does "===" operator check in JavaScript?',
      options: [
        'Only value equality',
        'Only type equality',
        'Both value and type equality',
        'Neither value nor type',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: 'Which of the following is NOT a JavaScript data type?',
      options: [
        'undefined',
        'boolean',
        'float',
        'symbol',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: 'What is the output of: console.log(typeof null)?',
      options: [
        'null',
        'undefined',
        'object',
        'string',
      ],
      correctAnswer: 2,
    },
  ],
};

const Assessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(assessmentData.timeLimit * 60);

  const question = assessmentData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentData.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [question.id]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < assessmentData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: connect to backend API
    setIsSubmitted(true);
    toast.success('Assessment submitted successfully!');
  };

  const calculateScore = () => {
    let correct = 0;
    assessmentData.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / assessmentData.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    const score = calculateScore();
    const passed = score >= assessmentData.passingScore;

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
                ? "You've passed the assessment!"
                : "You didn't pass this time, but you can try again."}
            </p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{score}%</p>
                <p className="text-sm text-muted-foreground">Your Score</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{assessmentData.passingScore}%</p>
                <p className="text-sm text-muted-foreground">Passing Score</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline">Review Answers</Button>
              <Button className="btn-primary-gradient">
                Continue Learning
              </Button>
            </div>
          </div>
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
                {assessmentData.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {assessmentData.course}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTime(timeRemaining)}
              </Badge>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {assessmentData.questions.length}
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
              {assessmentData.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-primary text-primary-foreground'
                      : answers[assessmentData.questions[index].id] !== undefined
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === assessmentData.questions.length - 1 ? (
              <Button className="btn-primary-gradient" onClick={handleSubmit}>
                Submit Assessment
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

export default Assessment;
