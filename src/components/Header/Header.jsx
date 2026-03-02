import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

import styles from './Header.module.css';
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Bölümü */}
        <Link to="/" className={styles.logo}>
          Psychologists.<span className={styles.logoServices}>services</span>
        </Link>

        {/* Navigasyon (Orta Kısım) */}
        <nav className={styles.nav}>
          <NavLink title="Home" to="/" className={styles.link}>Home</NavLink>
          <NavLink title="Psychologists" to="/psychologists" className={styles.link}>Psychologists</NavLink>
          {/* Eğer giriş yapmışsa Favoriler linkini de gösterelim */}
          {isLoggedIn && (
            <NavLink title="Favorites" to="/favorites" className={styles.link}>Favorites</NavLink>
          )}
        </nav>

        {/* Sağ Taraf: Auth Butonları */}
        <div className={styles.authWrapper}>
          {isLoggedIn ? (
            // GİRİŞ YAPILMIŞSA
            <div className={styles.userMenu}>
              <div className={styles.userIcon}>
                {/* Kullanıcı ikonu (SVG veya resim) buraya gelecek */}
              </div>
              <span className={styles.userName}>{user.name}</span>
              <button onClick={handleLogOut} className={styles.logoutBtn}>
                Log out
              </button>
            </div>
          ) : (
            // GİRİŞ YAPILMAMIŞSA
            <div className={styles.authBtns}>
              <Link to="/login" className={styles.loginBtn}>Log in</Link>
              <Link to="/register" className={styles.registerBtn}>Registration</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;