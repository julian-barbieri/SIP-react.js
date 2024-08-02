import React from 'react';
import './Button.css'; // Asegúrate de crear este archivo en la carpeta correspondiente

const Button = ({onClick, text, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
