import React, { useState } from "react";

const Camerabtn = ({ onClick, label, isActive }) => {
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
