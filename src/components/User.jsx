import React from "react";
import logo11 from "../images/logo11.png";

const User = () => {
  return (
    <div className="User">
      <div className="logo">
        <img src={logo11} alt="logo" />
      </div>
      <div className="info">
        <p>Todo Go Go</p>
        <a href="#">Logout</a>
      </div>
    </div>
  );
};

export default User;
