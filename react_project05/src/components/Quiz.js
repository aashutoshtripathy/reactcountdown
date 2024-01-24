import React, { useRef } from 'react'
import { useState, useCallback } from 'react'
import QUESTIONS from '../questions'
import completeQuiz from '../assets/quiz-complete.png'
import QuestionTimmer from './QuestionTimmer'

const Quiz = () => {
  // const [activeQuestions, setActiveQuestions] = useState(0)
  const suffeledAnswers = useRef();
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

  if (!suffeledAnswers.current) {
  suffeledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  suffeledAnswers.current.sort(() => Math.random() - 0.5);
  }

  

  return (
    <div id='quiz'>
    <div id='question'>
      <QuestionTimmer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
        {suffeledAnswers.current.map(answer => {
          const isSelected = userAnswer[userAnswer.length - 1] === answer;
          let cssClass = '';
          if (answerState === 'Answered' && isSelected) {
            cssClass = 'selected';
          }
          if((answerState==='correct'||answerState==='wrong') && isSelected){
            cssClass = answerState;
          }
          return<li key={answer} className='answer'><button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button></li>
        } )}
        </ul>
    </div>
    </div>
  )
}

export default Quiz 