import React from 'react'
import { useState, useCallback } from 'react'
import QUESTIONS from '../questions'
import Question from './Question'
import Summary from './Summary'

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
    return <Summary userAnswers={userAnswer}/>
  }

  

  

  return (
    <div id='quiz'>
    <Question index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer}   onSkipAnswer={handleSkipAnswer} />
    </div>
  )
}

export default Quiz 