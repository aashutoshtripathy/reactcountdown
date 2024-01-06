import React from "react";
import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResultModal";

const TimmerChallenge = ({ tittle, targetTime, remainingTime }) => {
  const [timeIsRemaining, setTimeIsRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();

  const timeIsActive =
    timeIsRemaining > 0 && timeIsRemaining < targetTime * 1000;

  // useEffect(() => {
  //     if (dialog.current) {
  //       dialog.current.open = () => {
  //         dialog.current.open();
  //       };
  //     }
  //   }, []);

  // useEffect(() => {
  //   if (timeIsRemaining <= targetTime) {
  //     clearInterval(timer.current);
  //     setTimeIsRemaining(targetTime * 1000);
  //     if (dialog.current) {
  //       dialog.current.open();
  //     }
  //   }
  // }, [timeIsRemaining, targetTime]);

  if (timeIsRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeIsRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      //     if(dialog.current){
      //     dialog.current.open();
      // }
    }, 10);
  }

  function handleReset() {
    setTimeIsRemaining(targetTime * 1000);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      {
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          remainingTime={targetTime}
          onReset={handleReset}
          result="Lost"
        />
      }
      <section className="challenge">
        <h2>{tittle}</h2>
        {/* {timeExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>
          {timeIsActive ? "Time is Running...." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
};

export default TimmerChallenge;

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
