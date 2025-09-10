import { Question } from "@/types/assessment";

export const PSYCHOMETRIC_QUESTIONS: Question[] = [
  // Interest Scale
  {
    id: "interest_1",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "How excited are you about the prospect of combining artificial intelligence with legal services?",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Not excited at all" },
        { value: 4, label: "Moderately excited" },
        { value: 7, label: "Extremely excited" }
      ]
    }
  },
  {
    id: "interest_2",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "How curious are you about understanding complex legal processes and translating them into automated systems?",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Not curious at all" },
        { value: 4, label: "Moderately curious" },
        { value: 7, label: "Extremely curious" }
      ]
    }
  },
  {
    id: "interest_3",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "How interested are you in staying updated with the latest AI and chatbot technologies?",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Not interested" },
        { value: 4, label: "Moderately interested" },
        { value: 7, label: "Very interested" }
      ]
    }
  },

  // Personality Compatibility - Openness
  {
    id: "personality_1",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I enjoy exploring new ideas and unconventional approaches to problem-solving.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },
  {
    id: "personality_2",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I am comfortable working with complex, abstract concepts and technologies.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },

  // Conscientiousness
  {
    id: "personality_3",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I pay close attention to details and thoroughly review my work before considering it complete.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },
  {
    id: "personality_4",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I prefer structured tasks with clear guidelines and requirements.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },

  // Motivation - Grit
  {
    id: "motivation_1",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "I have overcome setbacks to conquer an important challenge in my life.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },
  {
    id: "motivation_2",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "I finish whatever I begin, even when it becomes challenging or tedious.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  },

  // Growth Mindset
  {
    id: "mindset_1",
    type: "likert",
    category: "psychometric",
    subcategory: "mindset",
    question: "I believe that my abilities and intelligence can be developed through hard work and learning.",
    scale: {
      min: 1,
      max: 7,
      labels: [
        { value: 1, label: "Strongly disagree" },
        { value: 4, label: "Neutral" },
        { value: 7, label: "Strongly agree" }
      ]
    }
  }
];

export const TECHNICAL_QUESTIONS: Question[] = [
  // Programming Concepts
  {
    id: "tech_1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "programming",
    question: "What is the primary purpose of Natural Language Processing (NLP) in chatbot development?",
    options: [
      "To create visual interfaces for the chatbot",
      "To understand and process human language input",
      "To manage databases and storage systems",
      "To handle network communications"
    ]
  },
  {
    id: "tech_2",
    type: "multiple-choice",
    category: "technical",
    subcategory: "programming",
    question: "In Python, which data structure would be most appropriate for storing conversation history in a chatbot?",
    options: [
      "A single string variable",
      "A list of dictionaries",
      "A single integer",
      "A boolean flag"
    ]
  },
  {
    id: "tech_3",
    type: "multiple-choice",
    category: "technical",
    subcategory: "legal",
    question: "What is a 'contract' in legal terms?",
    options: [
      "A type of legal software",
      "A legally binding agreement between parties",
      "A court document filed by lawyers",
      "A method of legal research"
    ]
  },
  {
    id: "tech_4",
    type: "multiple-choice",
    category: "technical",
    subcategory: "chatbot",
    question: "What is an 'intent' in chatbot development?",
    options: [
      "The chatbot's purpose or goal",
      "The user's intention behind a message",
      "A programming error in the code",
      "The speed of the chatbot's response"
    ]
  },
  {
    id: "tech_5",
    type: "multiple-choice",
    category: "technical",
    subcategory: "chatbot",
    question: "Which framework is commonly used for building conversational AI applications?",
    options: [
      "React",
      "Rasa",
      "Angular",
      "Django"
    ]
  },

  // Logical Reasoning
  {
    id: "logic_1",
    type: "multiple-choice",
    category: "aptitude",
    subcategory: "logical",
    question: "If a legal chatbot processes 100 queries per hour and 15% require human intervention, how many queries can it handle autonomously in 8 hours?",
    options: [
      "680 queries",
      "720 queries", 
      "800 queries",
      "850 queries"
    ]
  },
  {
    id: "logic_2",
    type: "multiple-choice",
    category: "aptitude",
    subcategory: "logical",
    question: "A chatbot decision tree has 3 main branches, each with 4 sub-branches. How many total decision paths are possible?",
    options: [
      "7 paths",
      "12 paths",
      "16 paths",
      "64 paths"
    ]
  }
];

export const ALL_QUESTIONS = [...PSYCHOMETRIC_QUESTIONS, ...TECHNICAL_QUESTIONS];