import React from 'react'
import QUESTIONS from './Question'
import Answers from './Answers'
import QuestionTimmer from './QuestionTimmer'

const Question = ({questionText, answers, onSelectAnswer}) => {
  return (
    <div id='question'>
      <QuestionTimmer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers key={activeQuestionIndex} answers={QUESTIONS[activeQuestionIndex].answers} selectedAnswer={userAnswer[userAnswer.length - 1]} answerState={answerState} onSelect={handleSelectAnswer}/>
    </div>
  )
}

export default Question