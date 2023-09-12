import React, { useEffect, useState, useRef } from "react";

function CountdownTimer({parLength}) {
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const countdownRef = useRef(null);


  useEffect(() => {
    //using word = 5 chars and 50 wpm as typing rate for timer to deplete
    let calculatedTime = (parLength / 250) * 60;
    setTotalTime(calculatedTime);
    setTimeLeft(calculatedTime);
  },[parLength])


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
   // countdownRef.current.style.width = `${100 * timeLeft/ totalTime}%`;
   countdownRef.current.style.width = `${timeLeft}%`;
  }, [timeLeft, totalTime]);

  return (
    <div id="countdown">
     {/*} {console.log("length " + parLength)}
      {console.log("total " + totalTime)}
  {console.log("left " + timeLeft)}*/}
      <div id="countdown-bar" ref={countdownRef}></div>
    </div>
  );
}

export default CountdownTimer;
