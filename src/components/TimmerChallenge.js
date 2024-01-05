import React from 'react'
import {useState,useRef,useEffect} from 'react'
import ResultModal from './ResultModal';

const TimmerChallenge = ({tittle,targetTime}) => {


    const [timerStarted, setTimerStarted] = useState(false)
    const [timeExpired, setTimeExpired] = useState(false);

    const timer = useRef();
    const dialog = useRef(null);

    useEffect(() => {
        if (dialog.current) {
          dialog.current.showModal = () => {
            dialog.current.showModal();
          };
        }
      }, []); 


    function handleStart() {
        timer.current = setTimeout(() => {
            setTimeExpired(true);
            if(dialog.current){
            dialog.current.open();
        }
        },targetTime * 1000);
        setTimerStarted(true)
    }


    function handleStop() {
        clearTimeout(timer.current)
    }



  return (
    <>
    {timeExpired && <ResultModal ref={dialog} targetTime={targetTime} result='Lost'/>}
    <section className='challenge'>
        <h2>{tittle}</h2>
        {timeExpired && <p>You Lost!</p>}
        <p className='challenge-time'>
            {targetTime} second{targetTime>1?'s':''}
        </p>
        <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
            {timerStarted ? 'Time is Running....' : 'Timer Inactive'}
        </p>
    </section>
    </>
  )
}

export default TimmerChallenge
















// import React, { useState, useRef, useEffect } from 'react';
// import ResultModal from './ResultModal';

// const TimerChallenge = ({ title, targetTime }) => {
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [timeExpired, setTimeExpired] = useState(false);

//   const timer = useRef();
//   const dialog = useRef(null);

//   useEffect(() => {
//     if (dialog.current) {
//       dialog.current.showModal = () => {
//         // Implement showModal logic in ResultModal component
//         dialog.current.showModal(); // You might need to invoke showModal here
//       };
//     }
//   }, []); // Empty dependency array to run the effect only once

//   function handleStart() {
//     timer.current = setTimeout(() => {
//       setTimeExpired(true);
//       if (dialog.current) {
//         dialog.current.showModal(); // Access showModal on dialog.current
//       }
//     }, targetTime * 1000);
//     setTimerStarted(true);
//   }

//   function handleStop() {
//     clearTimeout(timer.current);
//   }

//   return (
//     <>
//       {timeExpired && <ResultModal ref={dialog} targetTime={targetTime} result="Lost" />}
//       <section className="challenge">
//         <h2>{title}</h2>
//         {timeExpired && <p>You Lost!</p>}
//         <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's' : ''}</p>
//         <p>
//           <button onClick={timerStarted ? handleStop : handleStart}>
//             {timerStarted ? 'Stop' : 'Start'} Challenge
//           </button>
//         </p>
//         <p className={timerStarted ? 'active' : undefined}>
//           {timerStarted ? 'Time is Running....' : 'Timer Inactive'}
//         </p>
//       </section>
//     </>
//   );
// };

// export default TimerChallenge;
