import React, { useEffect, useState, useRef, useContext } from "react";

function CountdownTimer({ curPar, timeLeft, setTimeLeft }) {
  const countdownRef = useRef(null);

  useEffect(() => {
    //using standard typing convention of 'word = 5 chars' and 50 wpm as typing rate for timer to deplete
    let calculatedTime = (curPar.length / 250) * 60;
    setTimeLeft(calculatedTime);
  }, [curPar]);

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
    countdownRef.current.style.width = `${
      (100 * timeLeft) / ((curPar.length / 250) * 60)
    }%`;
  }, [timeLeft]);

  return (
    <div id="countdown">
      Speed Bonus
      <div id="countdown-bar-container">
        <div id="countdown-bar" ref={countdownRef}></div>
      </div>
    </div>
  );
}

export default CountdownTimer;
