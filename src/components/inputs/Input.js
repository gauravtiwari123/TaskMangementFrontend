import React from 'react';
import style from './Input.module.css';

const Input = ({ type, classes, styles, name, id,placeholder ,onChange,value}) => {
  return (
    <div className={style['input-container']}>
      <input
        type={type}
        className={classes}
        style={styles}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
