import React from 'react';

const History = ({ history }) => {
    return (
        <div>
            <h2>Pomodoro History</h2>
            <ul>
                {history.map((session, index) => (
                    <li key={index}>
                        {session.duration} minutes - {session.completed ? 'Completed' : 'Interrupted'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;