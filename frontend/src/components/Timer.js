import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

const Timer = () => {
    const { isTimerActive, setIsTimerActive, history, setHistory } = useAppContext();
    const [time, setTime] = useState(1500); // 25 minutes in seconds

    useEffect(() => {
        let interval = null;
        if (isTimerActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
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
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <h1>Pomodoro Timer</h1>
            <div>{formatTime(time)}</div>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
};

export default Timer;