import React from 'react';
import style from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style["modal-overlay"]} onClick={onClose}>
      <div className={style["modal-content"]} onClick={e => e.stopPropagation()}>
        <button className={style["modal-close"]} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
