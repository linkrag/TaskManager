import React from 'react';
import './CustomFloatLabelInput.css';

const CustomFloatLabelInput = ({ id, value, onChange, label, textarea }) => {
  const InputComponent = textarea ? 'textarea' : 'input';

  return (
    <div className={`custom-float-label-input ${textarea ? 'textarea' : ''}`}>
      <InputComponent
        id={id}
        className={value ? 'active' : ''}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomFloatLabelInput;
