import React from 'react';
import PropTypes from 'prop-types';
import './Textarea.css'; 

const Textarea = ({ name,value, onChange, placeholder, rows, className }) => {
  return (
    <textarea
      className={`custom-textarea ${className}`} 
      value={value}
      name={name}
      onChange={e => onChange(e)} 
      placeholder={placeholder}
      rows={rows}
      style={{ resize: 'none' }} 
      aria-label={placeholder}
    />
  );
};

// Set default props
Textarea.defaultProps = {
  rows: 4,
  className: ''
};

// Prop types for validation
Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string
};

export default Textarea;
