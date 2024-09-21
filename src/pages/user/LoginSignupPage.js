import React from 'react';
import PropTypes from 'prop-types';
import img from '../../assets/images/Login_Logo.webp';
import style from '../../styles/LoginSignup.module.css';
const LoginSignupPage = ({ Page }) => {
  return (
    <div className={style.container}>
      <div className={style['page-img']}>
           <img src={img} alt="Login or Signup" className={style["logo-image"]} />
      </div>
      <div className={style['page-content']}>
        <Page />
      </div>
    </div>
  );
};

LoginSignupPage.propTypes = {
  Page: PropTypes.elementType.isRequired,
};

export default LoginSignupPage;
