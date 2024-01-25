import React from 'react'
import { useState, useCallback } from 'react'
import QUESTIONS from '../questions'
import completeQuiz from '../assets/quiz-complete.png'
import Question from './Question'

const Quiz = () => {
  // const [activeQuestions, setActiveQuestions] = useState(0)
  // const suffeledAnswers = useRef();
  // const [answerState, setAnswerState] = useState('')
  const [userAnswer, setUserAnswer] = useState([])


 const activeQuestionIndex = userAnswer.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevAnswer) => {
      return [...prevAnswer, selectedAnswer]
    });


  },[]);


 


  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); 

  if(quizIsComplete){
    return (<div id='summary'>
      <img src={completeQuiz} alt='Trophy Icon'/>
      <h2>Quiz Completed!!!....</h2>
    </div>
    );
  }

  

  

  return (
    <div id='quiz'>
    <Question index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer}   onSkipAnswer={handleSkipAnswer} />
    </div>
  )
}

export default Quiz 