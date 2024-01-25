import React from 'react'
import { useState,useEffect } from 'react';

const QuestionTimmer = ({timeout, onTimeout, mode}) => {
    const [remainingTime, setRemainingTime] = useState(timeout)



    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return()=>{
            clearTimeout(timer)
        }
    }, [onTimeout, timeout])


    useEffect(() => {
    const interval = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
    } , 100)
    return () => {
        clearInterval(interval)
    }
    }, [])
  return (
    <div>
        <progress id='question-time' max={timeout} value={remainingTime} className={mode}/>
    </div>
  )
}

export default QuestionTimmer