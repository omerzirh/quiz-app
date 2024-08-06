import React, { useState } from 'react';
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../../../types';
import Checkbox from '../../Choice/Choice';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  onAnswer: (answer: string[]) => void;
  showResult?: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, onAnswer, showResult }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (value: string) => {
    setSelectedOptions(prev =>
      prev.includes(value)
        ? prev.filter(option => option !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="multiple-choice-question">
      {question.options.map((option) => (
          <Checkbox
            option={option}
            isSelected={selectedOptions.includes(option.value)}
            onChange={handleOptionChange}
            type='checkbox'
            key={option.value}
            name="answer"
            showResult={showResult}
          />
      
      ))}
      <button type="submit" disabled={selectedOptions.length === 0}>Submit</button>
    </form>
  );
};

export default MultipleChoiceQuestion;