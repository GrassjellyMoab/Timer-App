import react, { useState, useRef, useEffect } from "react";
// import css
import classes from "./Timer.module.css";
// imported components
import StartTimer from "../StartTimer/StartTimer";
import StopTimer from "../StopTimer/StopTimer";
import ResetTimer from "../ResetTimer/ResetTimer";

const Timer = (props) => {
  // ref used for timer which also as a condition on whether timer started
  const timerRef = useRef(0);
  // state to contain time in string format
  const [counter, setCounter] = useState(0);

  // Start function
  const startTimer = () => {
    // If timer already started and is ongoing no change
    if (timerRef.current) {
      return;
    }

    // store a setInterval function into the timerRef
    // every 1 second, counter increases by 1
    timerRef.current = setInterval(() => {
      // use reference from previous state snapshot
      setCounter((current) => current + 1);
    }, 1000);
  };

  // Stop function
  const stopTimer = () => {
    clearInterval(timerRef.current);
    // reset the timerRef to 0
    timerRef.current = 0;
  };

  // Reset function
  const resetTimer = () => {
      // reset timerRef and clear interval
      clearInterval(timerRef.current);
      timerRef.current = 0;
      // reset counter state
      setCounter(0);
  }

  // displayed time in string
  var hrs = Math.floor(counter / 60 / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  var mins = (Math.floor(counter / 60) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });;
  var seconds = (counter % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });;

  var timeDisplayed = `${hrs}:${mins}:${seconds}`;

  return (
    <div className={classes.box}>
      <div className={classes["time-display"]}>{timeDisplayed}</div>
      <div className={classes.buttons}>
        <StartTimer onClick={startTimer}></StartTimer>
        <StopTimer onClick={stopTimer}></StopTimer>
        <ResetTimer onClick={resetTimer}></ResetTimer>
      </div>
    </div>
  );
};

export default Timer;
