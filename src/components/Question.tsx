import React, { useState, useEffect } from 'react';
import OneChoiceQuestion from './Questions/One/One';
import MultipleChoiceQuestion from './Questions/Multiple/Multiple';
import InputQuestion from './Questions/Input/Input';
import { Question as QuestionType } from '../types';

import './Question.css';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string | string[]) => void;
  showResult?: boolean;
  isTransitioning?: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, showResult, isTransitioning }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const renderQuestion = () => {
    switch (question.type) {
      case 'one-choice':
        return <OneChoiceQuestion question={question} onAnswer={onAnswer} showResult={showResult} />;
      case 'multiple-choice':
        return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} showResult={showResult} />;
      case 'input':
        return <InputQuestion question={question} onAnswer={onAnswer} showResult={showResult} />;
      default:
        return null;
    }
  };

  if (isTransitioning && !isMounted) {
    return null; 
  }

  return (
    <div className={`question-container ${isTransitioning ? 'question-transitioning' : ''}`}>
      <div className='question-header'>
        <h2 className="question-title">{question.title}</h2>
      </div>
      <div>
        {question.image && <img src={require(`../assets/images/${question.image}`)} alt={question.title} className="question-image" width={300}/>}
        <p className="question-description">{question.description}</p>
        <h3 className="question-text">{question.question}</h3>
        {renderQuestion()}
      </div>
    </div>
  );
};

export default Question;
