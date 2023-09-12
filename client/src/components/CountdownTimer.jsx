import React, { useEffect, useState, useRef } from "react";

function CountdownTimer({curPar}) {

  const [totalTime, setTotalTime] = useState((curPar.length / 250 * 60));
  const [timeLeft, setTimeLeft] = useState((curPar.length / 250 * 60));
  const countdownRef = useRef(null);


  useEffect(() => {
    //using standard typing convention of 'word = 5 chars' and 50 wpm as typing rate for timer to deplete
    let calculatedTime = (curPar.length / 250) * 60;
    setTotalTime(calculatedTime);
    setTimeLeft(calculatedTime);
  },[curPar])


  useEffect(() => {
    setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 0.01;
        } else {
          return 0;
        }
      });
    }, 10);
  }, []);

  useEffect(() => {
   countdownRef.current.style.width = `${100 * timeLeft / totalTime}%`;
  }, [timeLeft, totalTime]);

  return (
    <div id="countdown">
      <div id="countdown-bar" ref={countdownRef}></div>
    </div>
  );
}

export default CountdownTimer;
