import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // --- EKRAN BOYUTU KONTROLÜ ---
  // Ekran masaüstü boyutuna geldiğinde açık kalan mobil menüyü otomatik kapatır
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleLogOut = () => {
    dispatch(logOut());
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Bölümü */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          Psychologists<span className={styles.logoServices}>.services</span>
        </Link>

        {/* Hamburger Butonu (CSS'deki absolute yapısına uygun 3 div) */}
        <button 
          className={styles.hamburger} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen1 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen2 : ''}`}></div>
          <div className={`${styles.line} ${isMenuOpen ? styles.lineOpen3 : ''}`}></div>
        </button>

        {/* Navigasyon */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" className={styles.link} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={styles.link} onClick={closeMenu}>
            Psychologists
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={styles.link} onClick={closeMenu}>
              Favorites
            </NavLink>
          )}
        </nav>

        {/* Sağ Taraf: Auth Bölümü */}
        <div className={styles.authWrapper}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <div className={styles.userIcon}>
                <span role="img" aria-label="user">👤</span>
              </div>
              <span className={styles.userName}>{user?.name}</span>
              <button onClick={handleLogOut} className={styles.logoutBtn}>
                Log out
              </button>
            </div>
          ) : (
            <div className={styles.authBtns}>
              {/* Modal aşamasına geçtiğimizde buralar modal tetikleyici olacak */}
              <button type="button" className={styles.loginBtn} onClick={closeMenu}>Log in</button>
              <button type="button" className={styles.registerBtn} onClick={closeMenu}>Registration</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;