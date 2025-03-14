import React, { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import "./Timer.css";
import Avatar from "../Avatar/Avatar";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa"; // Import icons from react-icons

const Timer = () => {
  const { user, history, setHistory } = useAppContext();
  const [timerStatus, setTimerStatus] = useState("end"); // "start", "pause", "end"
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [mode, setMode] = useState("pomodoro");

  // Function to send data to the backend
  const sendDataToBackend = async (data) => {
    // try {
    //   const response = await fetch("/api/timer", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to save timer data");
    //   }
    //   const result = await response.json();
    //   console.log("Data saved successfully:", result);
    // } catch (error) {
    //   console.error("Error saving timer data:", error);
    // }
    console.log(data);
  };

  // Handle timer start
  const startTimer = () => {
    setTimerStatus("start");

    // Send start event to backend
    sendDataToBackend({
      event: "start",
      createdAt: new Date(),
      mode: mode,
    });
  };

  // Handle timer pause
  const pauseTimer = () => {
    setTimerStatus("pause");

    // Send pause event to backend
    sendDataToBackend({
      event: "pause",
      createdAt: new Date(),
      mode: mode,
    });
  };

  // Handle timer reset
  const resetTimer = () => {
    if (timerStatus === "end") return;

    setTimerStatus("end");

    // Send end event to backend
    sendDataToBackend({
      event: "end",
      createdAt: new Date(),
      mode: mode,
    });

    // Reset timer
    if (mode === "pomodoro") {
      setTime(25 * 60);
    } else if (mode === "shortBreak") {
      setTime(5 * 60);
    } else if (mode === "longBreak") {
      setTime(15 * 60);
    }
  };

  // Handle page exit (close or refresh)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (timerStatus !== "end") {
        sendDataToBackend({
          event: "end",
          createdAt: new Date(),
          mode: mode,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timerStatus, mode]);

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (timerStatus === "start" && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerStatus === "pause" && time !== 0) {
      clearInterval(interval);
    } else if (time === 0) {
      clearInterval(interval);
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [timerStatus, time]);

  const handlePomodoroClick = () => {
    if (timerStatus !== "end") {
      // Send end event when it's not start or pause.
      sendDataToBackend({
        event: "end",
        createdAt: new Date(),
        mode: mode,
      });
    }
    setMode("pomodoro");
    setTime(25 * 60);
    setTimerStatus("end");
  };

  const handleShortBreakClick = () => {
    if (timerStatus !== "end") {
      // Send end event when it's not start or pause.
      sendDataToBackend({
        event: "end",
        createdAt: new Date(),
        mode: mode,
      });
    }
    setMode("shortBreak");
    setTime(5 * 60);
    setTimerStatus("end");
  };

  const handleLongBreakClick = () => {
    if (timerStatus !== "end") {
      // Send end event when it's not start or pause.
      sendDataToBackend({
        event: "end",
        createdAt: new Date(),
        mode: mode,
      });
    }
    setMode("longBreak");
    setTime(15 * 60);
    setTimerStatus("end");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className={`timer-background ${mode}`}>
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
              <div
                className={`timer-display-header-button ${
                  mode === "pomodoro" ? "active" : ""
                }`}
                onClick={handlePomodoroClick}
              >
                <text>Pomodoro</text>
              </div>
              <div
                className={`timer-display-header-button ${
                  mode === "shortBreak" ? "active" : ""
                }`}
                onClick={handleShortBreakClick}
              >
                <text>Short Break</text>
              </div>
              <div
                className={`timer-display-header-button ${
                  mode === "longBreak" ? "active" : ""
                }`}
                onClick={handleLongBreakClick}
              >
                <text>Long Break</text>
              </div>
            </div>
            <div className="timer-display-time">
              <text className="timer-display-time-text">
                {formatTime(time)}
              </text>
            </div>

            <div className="timer-display-bottom">
              <div
                className={`timer-display-bottom-button ${
                  timerStatus === "start" ? "disabled" : ""
                }`}
                onClick={timerStatus !== "start" ? startTimer : undefined}
              >
                <FaPlay /> {/* Start icon */}
              </div>
              <div
                className={`timer-display-bottom-button ${
                  timerStatus !== "start" ? "disabled" : ""
                }`}
                onClick={timerStatus === "start" ? pauseTimer : undefined}
              >
                <FaPause /> {/* Pause icon */}
              </div>
              <div className="timer-display-bottom-button" onClick={resetTimer}>
                <FaRedo /> {/* Reset icon */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
