import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

import Modal from '../Shared/Modal/Modal';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import styles from './Header.module.css';
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleConfirmLogOut = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
    toast.success("Successfully logged out. See you soon!");
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          Psychologists<span className={styles.logoServices}>.services</span>
        </Link>

        <nav className={styles.desktopNav}>
          <NavLink to="/" className={styles.link}>Home</NavLink>
          <NavLink to="/psychologists" className={styles.link}>Psychologists</NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={styles.link}>Favorites</NavLink>
          )}
        </nav>

        <div className={styles.desktopAuth}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <div className={styles.userIconWrapper}>
                  <FaUser className={styles.userIcon} />
                </div>
                <span className={styles.userName}>{user?.displayName || user?.name}</span>
              </div>
              <button onClick={openLogoutModal} className={styles.logoutBtn}>Log out</button>
            </div>
          ) : (
            <div className={styles.authBtns}>
              <button className={styles.loginBtn} onClick={() => setIsLoginModalOpen(true)}>Log in</button>
              <button className={styles.registerBtn} onClick={() => setIsRegisterModalOpen(true)}>Registration</button>
            </div>
          )}
        </div>

        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen1 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen2 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen3 : ''}`}></div>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <NavLink to="/" className={styles.link} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/psychologists" className={styles.link} onClick={closeMenu}>Psychologists</NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={styles.link} onClick={closeMenu}>Favorites</NavLink>
          )}
        </nav>

        <div className={styles.mobileAuthWrapper}>
          {isLoggedIn ? (
            <div className={styles.mobileUserSection}>
              <div className={styles.userInfo}>
                <div className={styles.userIconWrapper}>
                  <FaUser className={styles.userIcon} />
                </div>
                <span className={styles.userName}>{user?.displayName || user?.name}</span>
              </div>
              <button onClick={openLogoutModal} className={styles.logoutBtn}>
                Log out
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthBtns}>
              <button
                className={styles.loginBtn}
                onClick={() => { setIsLoginModalOpen(true); closeMenu(); }}
              >
                Log in
              </button>
              <button
                className={styles.registerBtn}
                onClick={() => { setIsRegisterModalOpen(true); closeMenu(); }}
              >
                Registration
              </button>
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

      {isLogoutModalOpen && (
        <Modal onClose={closeLogoutModal}>
          <div className={styles.confirmContent}>
            <h2 className={styles.confirmTitle}>Log Out</h2>
            <p className={styles.confirmText}>Are you sure you want to log out of your account?</p>
            <div className={styles.confirmActions}>
              <button onClick={handleConfirmLogOut} className={styles.confirmBtn}>Yes, Log Out</button>
              <button onClick={closeLogoutModal} className={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;