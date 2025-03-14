import React, { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import "./Timer.css";
import Avatar from "../Avatar/Avatar";

const Timer = () => {
  const { user, history, setHistory } = useAppContext();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    let interval = null;
    if (isTimerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isTimerActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, time]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTime(1500);
    setHistory([...history, { duration: 25, completed: true }]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="timer-background">
      <div className="timer-container">
        <div className="timer-header">
          <div className="timer-header-content">
            <div className="timer-header-upper-content">
              <h1>Pomodoro Timer</h1>
              <Avatar />  
            </div>
            <div className="line-break" />
          </div>
         
        </div>
        <div className="timer-content-container">
          
          <div className="timer-display">

            <div className="timer-display-header">
              <div className="timer-display-header-button" onClick={startTimer}>
                Start
              </div>
              <div className="timer-display-header-button" onClick={pauseTimer}>
                Pause
              </div>
              <div className="timer-display-header-button" onClick={resetTimer}>
                Reset
              </div>
            </div>

            <div className="timer-display-time">
              <text className="timer-display-time-text">
                {formatTime(time)}
              </text>
            </div>

            <div className="timer-display-bottom">
              <text className="timer-display-bottom-text">Need a break?</text>
              <div
                className="timer-display-bottom-button"
                onClick={() => setTime(900)}
              >
                <text>15</text>
              </div>
              <div
                className="timer-display-bottom-button"
                onClick={() => setTime(300)}
              >
                <text>5</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
