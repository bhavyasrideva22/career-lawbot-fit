export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'boolean';
  category: 'psychometric' | 'technical' | 'aptitude';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: { value: number; label: string }[];
  };
}

export interface Response {
  questionId: string;
  value: number | string;
  timeSpent: number;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScores;
  overallScore: number;
  recommendation: 'pursue' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  careerPaths: Array<{
    title: string;
    description: string;
    match: number;
  }>;
  skillGaps: Array<{
    skill: string;
    current: number;
    target: number;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'results';
  currentQuestionIndex: number;
  responses: Response[];
  startTime: number;
  sectionStartTime: number;
}