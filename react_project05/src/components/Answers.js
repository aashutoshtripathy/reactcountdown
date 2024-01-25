import React, { useRef } from 'react'

const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {


    const suffeledAnswers = useRef();

    if (!suffeledAnswers.current) {
        suffeledAnswers.current = [...answers];
        suffeledAnswers.current.sort(() => Math.random() - 0.5);
        }



  return (
    <div>
        <ul id='answers'>
        {suffeledAnswers.current.map(answer => {
          const isSelected = selectedAnswer === answer;
          let cssClass = '';
          if (answerState === 'Answered' && isSelected) {
            cssClass = 'selected';
          }
          if((answerState==='correct'||answerState==='wrong') && isSelected){
            cssClass = answerState;
          }
          return<li key={answer} className='answer'><button onClick={() => onSelect(answer)} disabled={answerState !== ''} className={cssClass}>{answer}</button></li>
        } )}
        </ul>
    </div>
  )
}

export default Answers