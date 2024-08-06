import React from 'react';
import './Choice.css';

interface Option {
    value: string;
    text: string;
    isCorrect?: boolean;
  }
  
  interface CheckboxProps {
    option: Option;
    isSelected: boolean;
    onChange: (value: string) => void;
    showResult?: boolean;
    type: "radio" | "checkbox";
    name?: string;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({ option, isSelected, onChange, showResult, type, name }) => {
    const getClassName = () => {
      let className = "option";
      if (isSelected) className += " selected";
      if (showResult) {
        className += option.isCorrect ? " correct" : " incorrect";
      }
      return className;
    };
  
    return (
      <label key={option.value} className={getClassName()}>
        <input
          type={type}
          name={name}
          value={option.value}
          checked={isSelected}
          onChange={() => onChange(option.value)}
          className='option-input'
        />
        {option.text}
      </label>
    );
  };
  
  export default Checkbox;