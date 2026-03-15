import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // useNavigate eklendi
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

import Modal from '../Shared/Modal/Modal';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import styles from './Header.module.css';
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Yönlendirme için tanımladık
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleLogOut = () => {
    dispatch(logOut());
    setIsMenuOpen(false);
    navigate('/'); // Çıkış yapınca ana sayfaya yönlendirir
  };

  const closeMenu = () => setIsMenuOpen(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          Psychologists<span className={styles.logoServices}>.services</span>
        </Link>

        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen1 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen2 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen3 : ''}`}></div>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" className={styles.link} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/psychologists" className={styles.link} onClick={closeMenu}>Psychologists</NavLink>
          {/* Favoriler linki sadece giriş yapılmışsa görünür */}
          {isLoggedIn && <NavLink to="/favorites" className={styles.link} onClick={closeMenu}>Favorites</NavLink>}
        </nav>

        <div className={styles.authWrapper}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <div className={styles.userIconWrapper}>
                  <FaUser className={styles.userIcon} />
                </div>
                <span className={styles.userName}>{user?.displayName || user?.name}</span>
              </div>
              <button onClick={handleLogOut} className={styles.logoutBtn}>Log out</button>
            </div>
          ) : (
            <div className={styles.authBtns}>
              <button className={styles.loginBtn} onClick={() => { setIsLoginModalOpen(true); closeMenu(); }}>Log in</button>
              <button className={styles.registerBtn} onClick={() => { setIsRegisterModalOpen(true); closeMenu(); }}>Registration</button>
            </div>
          )}
        </div>
      </div>

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <LoginForm onClose={closeLoginModal} /> 
        </Modal>
      )}
      {isRegisterModalOpen && (
        <Modal onClose={closeRegisterModal}>
          <RegisterForm onClose={closeRegisterModal} /> 
        </Modal>
      )}
    </header>
  );
};

export default Header;