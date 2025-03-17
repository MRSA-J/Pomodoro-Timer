import React, { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import "./Timer.css";
import Avatar from "../Avatar/Avatar";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa"; // Import icons from react-icons
import axios from "axios"; // Import axios
import { fetchUserHistory } from "../../fetchUserHistory";

const Timer = () => {
  const { user, timerEvents, setTimerEvents, reloadHistory, setReloadHistory } =
    useAppContext();
  const [timerStatus, setTimerStatus] = useState("end"); // "start", "pause", "end"
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [mode, setMode] = useState("pomodoro");

  // Function to send data to the backend using axios
  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/timer-event/create",
        data
      ); // Send POST request to /api/timer-events
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving timer data:", error);
    }
  };

  // Handle timer start
  const startTimer = () => {
    setTimerStatus("start");

    // Send start event to backend
    sendDataToBackend({
      email: user.email, // Use email instead of userEmail
      event: "start",
      mode: mode,
    });
  };

  // Handle timer pause
  const pauseTimer = () => {
    setTimerStatus("pause");

    // Send pause event to backend
    sendDataToBackend({
      email: user.email, // Use email instead of userEmail
      event: "pause",
      mode: mode,
    });
  };

  // Handle timer reset
  const resetTimer = () => {
    if (timerStatus === "end") return;

    setTimerStatus("end");
    setReloadHistory(!reloadHistory);

    // Send end event to backend
    sendDataToBackend({
      email: user.email, // Use email instead of userEmail
      event: "end",
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

  // Resume timer from history
  const resumeUnfinishedTimer = () => {
    // setTimerStatus("start");
    // setMode(session.mode); // Set the mode based on the session
    // setTime(session.duration * 60); // Set the time based on the session duration
    // sendDataToBackend({
    //   email: user.email,
    //   event: "resume",
    //   mode: session.mode,
    // });
  };

  // Handle page exit (close or refresh)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (timerStatus === "start") {
        sendDataToBackend({
          email: user.email, // Use email instead of userEmail
          event: "link-break",
          mode: mode,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timerStatus, mode, user]);

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
  }, [timerStatus, time, resetTimer]);

  // Load Timer history
  useEffect(() => {
    if (user) {
      // Fetch user history
      fetchUserHistory(user.email, (updatedEvents) => {
        // Use a callback to ensure timerEvents is updated
        setTimerEvents(updatedEvents);

        if (updatedEvents.length === 0) return; // Exit if no events

        const latestSession = updatedEvents[updatedEvents.length - 1]; // Get the latest session
        const latestEvent =
          latestSession.events[latestSession.events.length - 1]; // Get the latest event

        if (latestEvent.event !== "link-break") return; // Exit if the latest event is not "link-break"
        console.log("Link-break event");

        // Set timer status to "start"
        setTimerStatus("start");

        // Calculate the corresponding time for the current mode
        const modeTime =
          mode === "pomodoro"
            ? 25 * 60
            : mode === "shortBreak"
            ? 5 * 60
            : 15 * 60;

        // Adjust the time based on the duration
        const remainingTime = Math.round(
          modeTime - latestSession.duration_time / 1000
        ); // Convert duration to seconds
        setTime(Math.max(remainingTime, 0)); // Ensure time is not negative

        // Send a "start" event to the backend
        sendDataToBackend({
          email: user.email,
          event: "start",
          mode: mode,
        });
      });
    }
  }, [reloadHistory, user, setTimerEvents, mode]); // Remove timerEvents from dependencies

  const handlePomodoroClick = () => {
    if (timerStatus !== "end") {
      sendDataToBackend({
        email: user.email, // Use email instead of userEmail
        event: "end",
        mode: mode,
      });
    }
    setMode("pomodoro");
    setTime(25 * 60);
    setTimerStatus("end");
    setReloadHistory(!reloadHistory);
  };

  const handleShortBreakClick = () => {
    if (timerStatus !== "end") {
      sendDataToBackend({
        email: user.email, // Use email instead of userEmail
        event: "end",
        mode: mode,
      });
    }
    setMode("shortBreak");
    setTime(5 * 60);
    setTimerStatus("end");
    setReloadHistory(!reloadHistory);
  };

  const handleLongBreakClick = () => {
    if (timerStatus !== "end") {
      sendDataToBackend({
        email: user.email, // Use email instead of userEmail
        event: "end",
        mode: mode,
      });
    }
    setMode("longBreak");
    setTime(15 * 60);
    setTimerStatus("end");
    setReloadHistory(!reloadHistory);
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
          <div className="timer-display-container">
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
                <div
                  className="timer-display-bottom-button"
                  onClick={resetTimer}
                >
                  <FaRedo /> {/* Reset icon */}
                </div>
              </div>
            </div>
            <div className="white-line-break" />
          </div>

          <div className="timer-history">
            <text className="history-title-text">History</text>
            <div className="history-list">
              {timerEvents
                .slice()
                .reverse()
                .map((eventGroup, index) => (
                  <div
                    key={index}
                    className={`history-item`} // Add mode-specific class
                  >
                    <div className="history-mode">
                      Mode: <strong>{eventGroup.mode}</strong>
                    </div>
                    <div className="history-events">
                      {eventGroup.events
                        .slice()
                        .reverse()
                        .map((event, idx) => (
                          // <History history={timerEvents} onResume={resumeTimer} /> {/* Pass resume function */}
                          <div key={idx} className="history-event" onResume={resumeTimer}>
                            <text className={`event-type ${event.event}`}>
                              {event.event === "start" && <FaPlay />}{" "}
                              {/* Start icon */}
                              {event.event === "pause" && <FaPause />}{" "}
                              {/* Pause icon */}
                              {event.event === "end" && <FaRedo />}{" "}
                              {/* End icon */}
                              {event.event}
                            </text>
                            <text className="event-time">
                              {new Date(event.createdAt).toLocaleTimeString()}
                            </text>
                          </div>
                        ))}
                    </div>
                    <div className="history-duration">
                      Duration:{" "}
                      <strong>{eventGroup.duration_time / 1000} s</strong>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
