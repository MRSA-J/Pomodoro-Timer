import React from 'react';

const History = ({ history, onResume }) => {
    return (
        <div>
            <h2>Pomodoro History</h2>
            <ul>
                {history.map((session, index) => (
                    <li key={index} onClick={() => onResume(session)}>
                        {session.duration} minutes - {session.completed ? 'Completed' : 'Interrupted'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;