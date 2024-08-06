import React, { useState } from 'react';
import { InputQuestion as InputQuestionType } from '../../../types';

import './Input.css';


interface InputQuestionProps {
  question: InputQuestionType;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

const InputQuestion: React.FC<InputQuestionProps> = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onAnswer(answer.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-question">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button type="submit" disabled={!answer.trim()}>Submit</button>
    </form>
  );
};

export default InputQuestion;