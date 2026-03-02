import { useState } from 'react'; // Doğru kullanım
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

import styles from './Header.module.css';

const Header = () => {
  // HATA DÜZELTİLDİ: require yerine useState kullanıyoruz
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
    setIsMenuOpen(false); // Çıkış yapınca menüyü kapat
  };

  // Menüdeki linklere tıklandığında menüyü kapatan yardımcı fonksiyon
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Bölümü */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          Psychologists.<span className={styles.logoServices}>services</span>
        </Link>

        {/* Hamburger Butonu */}
        <button 
          className={styles.hamburger} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={isMenuOpen ? styles.lineOpen1 : styles.line}></div>
          <div className={isMenuOpen ? styles.lineOpen2 : styles.line}></div>
          <div className={isMenuOpen ? styles.lineOpen3 : styles.line}></div>
        </button>

        {/* Navigasyon (Orta Kısım) */}
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

        {/* Sağ Taraf: Auth Butonları */}
        <div className={styles.authWrapper}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <div className={styles.userIcon}>
                {/* Buraya Figma'daki kullanıcı ikonu gelecek */}
                <span role="img" aria-label="user">👤</span>
              </div>
              <span className={styles.userName}>{user.name}</span>
              <button onClick={handleLogOut} className={styles.logoutBtn}>
                Log out
              </button>
            </div>
          ) : (
            <div className={styles.authBtns}>
              {/* Modal kullanacaksak bunları butona çevirebiliriz, şimdilik Link */}
              <Link to="/login" className={styles.loginBtn} onClick={closeMenu}>Log in</Link>
              <Link to="/register" className={styles.registerBtn} onClick={closeMenu}>Registration</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;