import React from 'react';
import styles from './Button.module.css';

const Button = ({ type = 'button', onClick, className, style, variant = 'primary', children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
