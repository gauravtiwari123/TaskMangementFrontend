import React from 'react';
import style from './../styles/HeaderFooter.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>
        <a href="/privacy-policy" className={style['footer-link']}>Privacy Policy</a> | 
        <a href="/terms-of-service" className={style['footer-link']}>Terms of Service</a>
      </p>
    </div>
  );
};

export default Footer;
