import React,{useState} from "react";
import Answers from "./Answers";
import QuestionTimmer from "./QuestionTimmer";
import QUESTIONS from '../questions'

const Question = ({ onSelectAnswer, onSkipAnswer, index }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  })


  let timer = 10000;


  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }


  function handleSelectedAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    })


    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      })

      setTimeout(() => {
        onSelectAnswer(answer)
      }, 2000);
    } ,1000)


    

  }


  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }else if (answer.selectedAnswer){
    answerState = 'answered';
  }


  return (
    <div id="question">
      <QuestionTimmer
      key={timer}
      mode={answerState}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectedAnswer}
      />
    </div>
  );
};

export default Question;
