import { useState, useEffect } from "react";
import { AssessmentState, Response, AssessmentResults as Results } from "@/types/assessment";
import { ALL_QUESTIONS, PSYCHOMETRIC_QUESTIONS, TECHNICAL_QUESTIONS } from "@/data/questions";
import { calculateScores } from "@/utils/scoring";
import AssessmentLanding from "./AssessmentLanding";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentResults from "./AssessmentResults";

const Assessment = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    responses: [],
    startTime: Date.now(),
    sectionStartTime: Date.now()
  });

  const [results, setResults] = useState<Results | null>(null);

  // Get current question based on section and index
  const getCurrentQuestion = () => {
    if (assessmentState.currentSection === 'psychometric') {
      return PSYCHOMETRIC_QUESTIONS[assessmentState.currentQuestionIndex];
    } else if (assessmentState.currentSection === 'technical') {
      return TECHNICAL_QUESTIONS[assessmentState.currentQuestionIndex];
    }
    return null;
  };

  const getTotalQuestionsInSection = () => {
    if (assessmentState.currentSection === 'psychometric') {
      return PSYCHOMETRIC_QUESTIONS.length;
    } else if (assessmentState.currentSection === 'technical') {
      return TECHNICAL_QUESTIONS.length;
    }
    return 0;
  };

  const startAssessment = () => {
    setAssessmentState({
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      responses: [],
      startTime: Date.now(),
      sectionStartTime: Date.now()
    });
  };

  const handleResponse = (response: Response) => {
    setAssessmentState(prev => {
      const existingIndex = prev.responses.findIndex(r => r.questionId === response.questionId);
      const newResponses = existingIndex >= 0 
        ? prev.responses.map((r, i) => i === existingIndex ? response : r)
        : [...prev.responses, response];

      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const goToNext = () => {
    const totalInSection = getTotalQuestionsInSection();
    
    if (assessmentState.currentQuestionIndex < totalInSection - 1) {
      // Move to next question in current section
      setAssessmentState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Move to next section or finish
      if (assessmentState.currentSection === 'psychometric') {
        setAssessmentState(prev => ({
          ...prev,
          currentSection: 'technical',
          currentQuestionIndex: 0,
          sectionStartTime: Date.now()
        }));
      } else if (assessmentState.currentSection === 'technical') {
        // Calculate results and show results page
        const calculatedResults = calculateScores(assessmentState.responses);
        setResults(calculatedResults);
        setAssessmentState(prev => ({
          ...prev,
          currentSection: 'results'
        }));
      }
    }
  };

  const goToPrevious = () => {
    if (assessmentState.currentQuestionIndex > 0) {
      // Move to previous question in current section
      setAssessmentState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    } else if (assessmentState.currentSection === 'technical') {
      // Move to last question of psychometric section
      setAssessmentState(prev => ({
        ...prev,
        currentSection: 'psychometric',
        currentQuestionIndex: PSYCHOMETRIC_QUESTIONS.length - 1
      }));
    }
  };

  const canGoBack = () => {
    return assessmentState.currentQuestionIndex > 0 || assessmentState.currentSection === 'technical';
  };

  const canGoNext = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    const hasResponse = assessmentState.responses.some(r => r.questionId === currentQuestion.id);
    return hasResponse;
  };

  const restartAssessment = () => {
    setAssessmentState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      responses: [],
      startTime: Date.now(),
      sectionStartTime: Date.now()
    });
    setResults(null);
  };

  const getQuestionNumber = () => {
    if (assessmentState.currentSection === 'psychometric') {
      return assessmentState.currentQuestionIndex + 1;
    } else if (assessmentState.currentSection === 'technical') {
      return PSYCHOMETRIC_QUESTIONS.length + assessmentState.currentQuestionIndex + 1;
    }
    return 0;
  };

  const getTotalQuestions = () => {
    return PSYCHOMETRIC_QUESTIONS.length + TECHNICAL_QUESTIONS.length;
  };

  const getExistingResponse = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return undefined;
    
    return assessmentState.responses.find(r => r.questionId === currentQuestion.id);
  };

  // Render based on current section
  if (assessmentState.currentSection === 'intro') {
    return <AssessmentLanding onStartAssessment={startAssessment} />;
  }

  if (assessmentState.currentSection === 'results' && results) {
    return <AssessmentResults results={results} onRestart={restartAssessment} />;
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <AssessmentQuestion
      question={currentQuestion}
      questionNumber={getQuestionNumber()}
      totalQuestions={getTotalQuestions()}
      currentSection={assessmentState.currentSection}
      onResponse={handleResponse}
      onPrevious={goToPrevious}
      onNext={goToNext}
      canGoBack={canGoBack()}
      canGoNext={canGoNext()}
      existingResponse={getExistingResponse()}
    />
  );
};

export default Assessment;