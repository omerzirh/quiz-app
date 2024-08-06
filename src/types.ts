export interface Option {
    value: string;
    text: string;
  }
  
  export interface BaseQuestion {
    id: string;
    type: 'one-choice' | 'multiple-choice' | 'input';
    title: string;
    description: string;
    image?: string;
    question: string;
  }
  
  export interface OneChoiceQuestion extends BaseQuestion {
    type: 'one-choice';
    options: Option[];
    correctAnswer: string;
    nextQuestion: string | { [key: string]: string; default: string };
  }
  
  export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple-choice';
    options: Option[];
    correctAnswers: string[];
    nextQuestion: string;
  }
  
  export interface InputQuestion extends BaseQuestion {
    type: 'input';
    correctAnswer: string;
    nextQuestion: string;
  }
  
  export type Question = OneChoiceQuestion | MultipleChoiceQuestion | InputQuestion;
  
  export interface QuizData {
    questions: Question[];
  }