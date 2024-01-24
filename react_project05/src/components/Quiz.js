import React from 'react'
import { useState } from 'react'
import QUESTIONS from '../questions'
import completeQuiz from '../assets/quiz-complete.png'
import QuestionTimmer from './QuestionTimmer'

const Quiz = () => {
  // const [activeQuestions, setActiveQuestions] = useState(0)
  const [userAnswer, setUserAnswer] = useState([])



  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevAnswer) => {
      return [...prevAnswer, selectedAnswer]
    });
  }


  const activeQuestionIndex = userAnswer.length

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;



  if(quizIsComplete){
    return (<div id='summary'>
      <img src={completeQuiz} alt='Trophy Icon'/>
      <h2>Quiz Completed!!!....</h2>
    </div>
    );
  }

  const suffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  suffeledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
    <div id='question'>
      <QuestionTimmer timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
        {suffeledAnswers.map(answer => <li key={answer} className='answer'><button onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>)}
        </ul>
    </div>
    </div>
  )
}

export default Quiz 