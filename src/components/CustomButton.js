import React from 'react';
import './CustomButton.css';

const CustomButton = ({ label, icon, className, onClick, style }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick} style={style}>
      {icon && <i className={`material-icons ${icon}`}></i>}
      {label}
    </button>
  );
};

export default CustomButton;
