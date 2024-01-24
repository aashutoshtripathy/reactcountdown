import React from 'react'
import { useState,useEffect } from 'react';

const QuestionTimmer = ({timeout, onTimeout}) => {
    const [remainingTime, setRemainingTime] = useState(timeout)



    useEffect(() => {
        setTimeout(onTimeout, timeout);
    }, [onTimeout, timeout])


    useEffect(() => {
    setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
    } , 100)
    }, [])
  return (
    <div>
        <progress id='question-time' max={timeout} value={remainingTime}/>
    </div>
  )
}

export default QuestionTimmer