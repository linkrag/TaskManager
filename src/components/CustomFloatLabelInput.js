import React, { useState } from 'react';
import './CustomFloatLabelInput.css';

const CustomFloatLabelInput = ({ id, value, onChange, label, textarea, type, onBlur }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const InputComponent = textarea ? 'textarea' : 'input';

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`custom-float-label-input ${textarea ? 'textarea' : ''}`}>
      <InputComponent
        id={id}
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
        className={value ? 'active' : ''}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      <label htmlFor={id}>{label}</label>
      {type === 'password' && (
        <button type="button" onClick={handleTogglePassword} className="toggle-password">
          {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
        </button>
      )}
    </div>
  );
};

export default CustomFloatLabelInput;
