// frontend/src/components/Avatar.js
import React from "react";
import { useAppContext } from "../../AppContext";
import { useAuth0 } from '@auth0/auth0-react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Avatar.css";


const Avatar = () => {
    const { user } = useAppContext();
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
    };

    return (
        <div className="avatar-container">
            <Dropdown align="end">
                <Dropdown.Button>
                <img 
                    className="avatar-image"
                    src={
                        user
                        ? user.picture
                        : "https://th.bing.com/th/id/OIP.Sdwk-7MkBK1c_ap_eGCwxwHaHa?rs=1&pid=ImgDetMain"
                    }
                    alt="User Avatar"
                />
                </Dropdown.Button>
                <Dropdown.Content className="dropdown-menu">
                    <div onClick={handleLogout}>
                        <img src="/icons/user-black.png" alt="user icon" className="dropdown-icon" />
                        Logout
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
};

export default Avatar;
