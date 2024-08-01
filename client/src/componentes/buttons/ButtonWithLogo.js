import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithLogo.css';

const ButtonWithLogo = ({ to, text, logo }) => {
  return (
    <div className='column'>
      <Link to={to} className='welcome-button'>
        {text}
        <div className='logo'>
            {logo}
        </div>
      </Link>
    </div>
  );
};

export default ButtonWithLogo;
