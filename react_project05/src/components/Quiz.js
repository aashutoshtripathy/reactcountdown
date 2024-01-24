import React from 'react'
import { useState, useCallback } from 'react'
import QUESTIONS from '../questions'
import completeQuiz from '../assets/quiz-complete.png'
import QuestionTimmer from './QuestionTimmer'
import Answers from './Answers'
import Question from './Question'

const Quiz = () => {
  // const [activeQuestions, setActiveQuestions] = useState(0)
  // const suffeledAnswers = useRef();
  const [answerState, setAnswerState] = useState('')
  const [userAnswer, setUserAnswer] = useState([])


 const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('Answered')
    setUserAnswer((prevAnswer) => {
      return [...prevAnswer, selectedAnswer]
    });


    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct')
      }else{
        setAnswerState('wrong')
      }


      setTimeout(() => {
        setAnswerState('')
      }, 2000);
    }, 1000);
  },[activeQuestionIndex])


 


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
    <Question questionText={QUESTIONS[activeQuestionIndex].text} answers={QUESTIONS[activeQuestionIndex].answers} onSelectAnswer={handleSelectAnswer}/>
    </div>
  )
}

export default Quiz 