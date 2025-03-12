// frontend/src/components/Avatar.js
import React from 'react';
import { useAppContext } from '../../AppContext';
import './Avatar.css';

const Avatar = () => {
    const { user } = useAppContext();
    return (
        <img 
            className='avatar-image'
            src={user.picture}
            alt="User Avatar" 
            referrerpolicy="no-referrer" 
        />
    );
};

export default Avatar;