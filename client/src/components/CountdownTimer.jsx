import React, { useEffect, useState, useRef } from "react";

function CountdownTimer() {
  //change later
  const [totalTime, setTotalTime] = useState(100);
  const [timeLeft, setTimeLeft] = useState(100);
  const countdownRef = useRef(null);

  useEffect(() => {
    setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    countdownRef.current.style.width = `${timeLeft}%`;
  }, [timeLeft]);

  return (
    <div id="countdown">
      {console.log(timeLeft)}
      <div id="countdown-bar" ref={countdownRef}></div>
    </div>
  );
}

export default CountdownTimer;
