import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import './Timer.css';
import Avatar from './Avatar/Avatar';

const Timer = () => {
    const { user, history, setHistory } = useAppContext();
    const [isTimerActive, setIsTimerActive] = useState(false);
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
        <div className='timer-background'>
            <div className='timer-container'>
                <div className='timer-header'>
                    <div className='timer-header-content'>
                        <h1>Pomodoro Timer</h1>
                        <Avatar />
                    </div>
                    <div className='line-break' />
                </div>
                x
                <div className='timer-display'>
                    
                    <div>{formatTime(time)}</div>    
                </div>
                
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>    
            </div>
        </div>
    );
};


export default Timer;