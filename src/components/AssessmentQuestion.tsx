import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, Response } from "@/types/assessment";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AssessmentQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  currentSection: string;
  onResponse: (response: Response) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  existingResponse?: Response;
}

const AssessmentQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  currentSection,
  onResponse,
  onPrevious,
  onNext,
  canGoBack,
  canGoNext,
  existingResponse
}: AssessmentQuestionProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    existingResponse?.value?.toString() || ""
  );
  const [startTime] = useState(Date.now());

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const timeSpent = Date.now() - startTime;
    
    const response: Response = {
      questionId: question.id,
      value: question.type === 'likert' ? parseInt(value) : value,
      timeSpent
    };
    
    onResponse(response);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  const renderLikertScale = () => {
    if (!question.scale) return null;

    const { min, max, labels } = question.scale;
    const options = [];
    
    for (let i = min; i <= max; i++) {
      options.push(i);
    }

    return (
      <div className="space-y-6">
        <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
          <div className="grid grid-cols-7 gap-2">
            {options.map((value) => (
              <div key={value} className="text-center">
                <RadioGroupItem 
                  value={value.toString()} 
                  id={`option-${value}`}
                  className="mx-auto mb-2"
                />
                <Label 
                  htmlFor={`option-${value}`} 
                  className="text-sm cursor-pointer block"
                >
                  {value}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          {labels.map((label) => (
            <span key={label.value} className="text-center max-w-[100px]">
              {label.label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;

    return (
      <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="text-base cursor-pointer flex-1 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'psychometric':
        return 'Psychometric Assessment';
      case 'technical':
        return 'Technical & Aptitude Assessment';
      default:
        return 'Assessment';
    }
  };

  const getSectionColor = () => {
    switch (currentSection) {
      case 'psychometric':
        return 'text-primary';
      case 'technical':
        return 'text-accent';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-2xl font-bold ${getSectionColor()}`}>
              {getSectionTitle()}
            </h1>
            <span className="text-muted-foreground">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-background shadow-large border-border/50 mb-8">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === 'likert' && renderLikertScale()}
            {question.type === 'multiple-choice' && renderMultipleChoice()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {selectedValue ? (
              <span className="text-success">Answer recorded</span>
            ) : (
              <span>Please select an answer to continue</span>
            )}
          </div>

          <Button
            variant={selectedValue ? "default" : "outline"}
            onClick={onNext}
            disabled={!canGoNext || !selectedValue}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestion;