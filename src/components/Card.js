import React from 'react';
import './Card.css';

const Card = ({ title, footer, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer">
        {footer}
      </div>}
    </div>
  );
};

export default Card;
