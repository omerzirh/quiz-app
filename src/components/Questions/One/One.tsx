import React, { useState } from 'react';
import { OneChoiceQuestion as OneChoiceQuestionType } from '../../../types';
import Checkbox from '../../Choice/Choice';

interface OneChoiceQuestionProps {
  question: OneChoiceQuestionType;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

const OneChoiceQuestion: React.FC<OneChoiceQuestionProps> = ({ question, onAnswer, showResult }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="one-choice-question">
      {question.options.map((option) => (
        <Checkbox
          option={option}
          isSelected={selectedOption === option.value}
          onChange={(value) => setSelectedOption(value)}
          type='radio'
          name="answer"
          key= {option.value}
          showResult={showResult}
          />
      ))}
      <button type="submit" disabled={!selectedOption}>Submit</button>
    </form>
  );
};

export default OneChoiceQuestion;