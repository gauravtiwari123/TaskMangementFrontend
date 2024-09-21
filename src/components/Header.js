import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import style from './../styles/HeaderFooter.module.css';
import { logout } from './../services/Api';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove('token');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isLoginOrSignup = location.pathname === '/' || location.pathname === '/signup';

  return (
    <header className={style.header}>
      <div className={style.logo}>TO DO LISTS</div>
      {!isLoginOrSignup && (
        <div className={style.logoutButton} onClick={handleLogout}>
          Logout
        </div>
      )}
    </header>
  );
};

export default Header;
