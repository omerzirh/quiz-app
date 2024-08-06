import React, { useState, useEffect } from 'react';
import Question from '../../components/Question';
import culturalQuiz from '../../utils/questions/culturalData.json';
import sportsQuiz from '../../utils/questions/sportsData.json';

import { Question as QuestionType, QuizData } from '../../types';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import './QuizEngine.css';

interface Answer {
  questionId: string;
  answer: string | string[];
}

const QuizEngine: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
  const [quizEnded, setQuizEnded] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [typedQuizData, setTypedQuizData] = useState<QuizData>();
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]); 
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true); 

  const typedCulturalQuiz = culturalQuiz as QuizData;
  const typedSportsQuiz = sportsQuiz as QuizData;


  useEffect(() => {
    if (typedQuizData) {
      setCurrentQuestion(typedQuizData.questions[0]);
      setShowLandingPage(false); 
    }
  }, [typedQuizData]);


  const handleAnswer = (answer: string | string[]) => {
    if (!currentQuestion) return;

    setUserAnswers([...userAnswers, { questionId: currentQuestion.id, answer }]);

    const nextQuestionId = typeof currentQuestion.nextQuestion === 'string'
      ? currentQuestion.nextQuestion
      : (currentQuestion.nextQuestion as { [key: string]: string })[answer as string] || 
        (currentQuestion.nextQuestion as { [key: string]: string }).default;

    if (nextQuestionId === 'end') {
      setQuizEnded(true);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextQuestion = typedQuizData?.questions.find(q => q.id === nextQuestionId);
        if (nextQuestion) {
          setCurrentQuestion(nextQuestion);
          setCurrentQuestionIndex(typedQuizData?.questions?.findIndex(q => q.id === nextQuestionId)||0);
          setIsTransitioning(false);
        }
      }, 500);
    }
  };

  const compareAnswers = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer) => {
      const question = typedQuizData?.questions.find(q => q.id === answer.questionId);
      if (question) {
        if (question.type === 'one-choice' || question.type === 'input') {
          if (answer.answer === question.correctAnswer) {
            correctAnswers++;
          }
        } else if (question.type === 'multiple-choice') {
          if (Array.isArray(answer.answer) && Array.isArray(question.correctAnswers)) { 
            if (answer.answer.every(a => question.correctAnswers.includes(a)) &&
                question.correctAnswers.every(a => answer.answer.includes(a))) {
              correctAnswers++;
            }
          }
        }
      }
    });
    return correctAnswers;
  };

  if (quizEnded) {
    const numCorrect = compareAnswers();
    return (
      <div className="quiz-end">
        Quiz ended! You got {numCorrect} out of {typedQuizData?.questions.length} correct.
      </div>
    );
  }
  return (
    <div className="quiz-engine">
      {showLandingPage && (
        <div className="landing-page">
          <h1>Welcome to the Quiz!</h1>
          <p>Select a category to start:</p>
          <div className='landing-button-container'>
          <button onClick={() => setTypedQuizData(typedCulturalQuiz)}>General Knowledge</button>
          <button onClick={() => setTypedQuizData(typedSportsQuiz)}>Sports</button>
          </div>
          
        </div>
      )}
      {!showLandingPage && (
        <>
          <ProgressBar
            current={currentQuestionIndex + 1 || 0}
            total={typedQuizData?.questions.length || 0}
          />
          {currentQuestion && (
            <Question
              question={currentQuestion}
              onAnswer={handleAnswer}
              isTransitioning={isTransitioning}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizEngine;
