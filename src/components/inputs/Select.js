import React from 'react';
import './Select.css';

const Select = ({name, data = [], onChange, className = '', style = {} }) => {
  return (
    <select 
      className={`custom-select ${className}`} 
      style={style} 
      onChange={onChange}
      name={name}
    >
      {data.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
