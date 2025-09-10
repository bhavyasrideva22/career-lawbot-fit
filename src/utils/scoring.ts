import { Response, WiscarScores, AssessmentResults } from "@/types/assessment";
import { PSYCHOMETRIC_QUESTIONS, TECHNICAL_QUESTIONS } from "@/data/questions";

export const calculateScores = (responses: Response[]): AssessmentResults => {
  const psychometricResponses = responses.filter(r => 
    PSYCHOMETRIC_QUESTIONS.some(q => q.id === r.questionId)
  );
  
  const technicalResponses = responses.filter(r => 
    TECHNICAL_QUESTIONS.some(q => q.id === r.questionId)
  );

  // Calculate psychometric score (0-100)
  const psychometricScore = calculatePsychometricScore(psychometricResponses);
  
  // Calculate technical score (0-100) 
  const technicalScore = calculateTechnicalScore(technicalResponses);
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(psychometricResponses, technicalResponses);
  
  // Overall score is weighted average
  const overallScore = Math.round(
    (psychometricScore * 0.4) + 
    (technicalScore * 0.3) + 
    (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.3)
  );

  // Determine recommendation
  const recommendation = getRecommendation(overallScore, psychometricScore, technicalScore);
  
  // Generate insights and next steps
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores);
  const nextSteps = generateNextSteps(recommendation, technicalScore, wiscarScores);
  
  // Career paths based on scores
  const careerPaths = generateCareerPaths(overallScore, wiscarScores);
  
  // Skill gaps analysis
  const skillGaps = generateSkillGaps(technicalScore, wiscarScores);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    insights,
    nextSteps,
    careerPaths,
    skillGaps
  };
};

const calculatePsychometricScore = (responses: Response[]): number => {
  if (responses.length === 0) return 0;
  
  const total = responses.reduce((sum, response) => {
    const value = typeof response.value === 'number' ? response.value : 0;
    return sum + value;
  }, 0);
  
  const maxPossible = responses.length * 7; // Assuming 7-point scale
  return Math.round((total / maxPossible) * 100);
};

const calculateTechnicalScore = (responses: Response[]): number => {
  if (responses.length === 0) return 0;
  
  // Correct answers for technical questions
  const correctAnswers: Record<string, string> = {
    'tech_1': 'To understand and process human language input',
    'tech_2': 'A list of dictionaries',
    'tech_3': 'A legally binding agreement between parties',
    'tech_4': 'The user\'s intention behind a message',
    'tech_5': 'Rasa',
    'logic_1': '680 queries',
    'logic_2': '12 paths'
  };
  
  const correctCount = responses.reduce((count, response) => {
    const correctAnswer = correctAnswers[response.questionId];
    return correctAnswer === response.value ? count + 1 : count;
  }, 0);
  
  return Math.round((correctCount / responses.length) * 100);
};

const calculateWiscarScores = (psychometric: Response[], technical: Response[]): WiscarScores => {
  // This is a simplified calculation - in practice, you'd have more sophisticated mapping
  const psyScore = calculatePsychometricScore(psychometric);
  const techScore = calculateTechnicalScore(technical);
  
  return {
    will: Math.min(100, psyScore + 10), // Motivation questions boost will
    interest: psyScore, // Interest questions directly map
    skill: techScore, // Technical questions map to skill
    cognitiveReadiness: Math.round((psyScore + techScore) / 2), // Combined cognitive ability
    abilityToLearn: Math.min(100, psyScore + 15), // Growth mindset questions boost this
    realWorldAlignment: Math.round((psyScore * 0.6) + (techScore * 0.4)) // Combined fit
  };
};

const getRecommendation = (
  overall: number, 
  psychometric: number, 
  technical: number
): 'pursue' | 'maybe' | 'no' => {
  if (overall >= 75 && psychometric >= 70 && technical >= 60) return 'pursue';
  if (overall >= 50 && (psychometric >= 60 || technical >= 50)) return 'maybe';
  return 'no';
};

const generateInsights = (
  psychometric: number,
  technical: number,
  wiscar: WiscarScores
): string[] => {
  const insights: string[] = [];
  
  if (psychometric >= 80) {
    insights.push("You show strong psychological compatibility for legal chatbot development with high motivation and interest.");
  } else if (psychometric >= 60) {
    insights.push("You demonstrate good psychological fit with room for growth in confidence and motivation.");
  } else {
    insights.push("Consider developing stronger interest and motivation in legal AI before pursuing this path.");
  }
  
  if (technical >= 75) {
    insights.push("Your technical foundation is solid - you're ready for advanced legal chatbot development training.");
  } else if (technical >= 50) {
    insights.push("You have basic technical knowledge but need to strengthen programming and legal domain skills.");
  } else {
    insights.push("Focus on building fundamental programming and legal concepts before specializing in chatbots.");
  }
  
  if (wiscar.abilityToLearn >= 80) {
    insights.push("Your strong learning ability suggests you'll quickly adapt to new technologies and challenges.");
  }
  
  return insights;
};

const generateNextSteps = (
  recommendation: 'pursue' | 'maybe' | 'no',
  technical: number,
  wiscar: WiscarScores
): string[] => {
  const steps: string[] = [];
  
  switch (recommendation) {
    case 'pursue':
      steps.push("Enroll in advanced NLP and chatbot development courses");
      steps.push("Start building a portfolio with legal chatbot projects");
      steps.push("Join legal tech communities and networking groups");
      steps.push("Consider internships at legal tech companies");
      break;
      
    case 'maybe':
      if (technical < 60) {
        steps.push("Strengthen programming fundamentals, especially Python");
        steps.push("Complete basic courses in legal concepts and terminology");
      }
      steps.push("Build confidence through smaller AI projects first");
      steps.push("Reassess in 3-6 months after skill development");
      break;
      
    case 'no':
      steps.push("Consider alternative roles like legal research analyst");
      steps.push("Explore general software development before specializing");
      steps.push("Develop interest through legal tech podcasts and articles");
      break;
  }
  
  return steps;
};

const generateCareerPaths = (overall: number, wiscar: WiscarScores) => [
  {
    title: "Legal Chatbot Developer",
    description: "Build AI chatbots specifically for legal services and client interaction",
    match: Math.round((overall + wiscar.skill + wiscar.interest) / 3)
  },
  {
    title: "Legal Technologist", 
    description: "Integrate various tech solutions for law firms and legal departments",
    match: Math.round((overall + wiscar.realWorldAlignment) / 2)
  },
  {
    title: "NLP Engineer (Legal Domain)",
    description: "Develop language models and processing systems for legal text",
    match: Math.round((wiscar.skill + wiscar.cognitiveReadiness) / 2)
  },
  {
    title: "AI Consultant (Legal Industry)",
    description: "Advise law firms on AI strategy and implementation",
    match: Math.round((wiscar.realWorldAlignment + wiscar.will) / 2)
  },
  {
    title: "Legal Data Analyst",
    description: "Extract insights from legal datasets using AI and analytics",
    match: Math.round((wiscar.skill + wiscar.cognitiveReadiness * 0.8))
  }
];

const generateSkillGaps = (technical: number, wiscar: WiscarScores) => [
  {
    skill: "Python Programming",
    current: Math.round(technical * 0.8),
    target: 85,
    priority: technical < 60 ? 'high' as const : 'medium' as const
  },
  {
    skill: "Legal Domain Knowledge", 
    current: Math.round(technical * 0.6),
    target: 75,
    priority: technical < 50 ? 'high' as const : 'medium' as const
  },
  {
    skill: "NLP & Chatbot Frameworks",
    current: Math.round(wiscar.skill * 0.7),
    target: 80,
    priority: 'high' as const
  },
  {
    skill: "Machine Learning Basics",
    current: Math.round(wiscar.cognitiveReadiness * 0.6),
    target: 70,
    priority: 'medium' as const
  }
];