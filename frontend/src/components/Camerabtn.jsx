import React, { useState } from "react";

const Camerabtn = ({ onClick, label, isActive }) => {
  //const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`btn btn-outline ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Camerabtn;
