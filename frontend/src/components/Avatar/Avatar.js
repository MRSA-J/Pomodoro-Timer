// frontend/src/components/Avatar.js
import React, { useState, useRef } from "react";
import { useAppContext } from "../../AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import "./Avatar.css";

const Avatar = () => {
  const { user } = useAppContext();
  const { logout } = useAuth0();
//   const { loginWithRedirect, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="avatar-container">
      <div className="dropdown" ref={dropdownRef}>
        <img
          className="avatar-image"
          src={
            user
              ? user.picture
              : "https://th.bing.com/th/id/OIP.Sdwk-7MkBK1c_ap_eGCwxwHaHa?rs=1&pid=ImgDetMain"
          }
          alt="User Avatar"
          onClick={toggleDropdown}
        />
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleLogout}>
              <img className="dropdown-icon" src="./icons/user-black.png" alt="User Avatar"/>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
