// frontend/src/components/Avatar.js
import React from "react";
import { useAppContext } from "../../AppContext";
import "./Avatar.css";

const Avatar = () => {
  const { user } = useAppContext();
  return (
    <img
      className="avatar-image"
      src={
        user
          ? user.picture
          : "https://th.bing.com/th/id/OIP.Sdwk-7MkBK1c_ap_eGCwxwHaHa?rs=1&pid=ImgDetMain"
      }
      alt="User Avatar"
      referrerpolicy="no-referrer"
    />
  );
};

export default Avatar;
