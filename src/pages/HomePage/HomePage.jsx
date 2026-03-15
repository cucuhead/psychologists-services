import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux durumunu okumak için ekledik
import { selectIsLoggedIn } from '../../redux/auth/selectors'; // Selector'ı import ettik
import styles from './HomePage.module.css';
import { LuArrowUpRight } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import homeImage from '../../assets/home-image.jpg'; 

const HomePage = () => {
  const navigate = useNavigate();
  // Kullanıcının giriş yapıp yapmadığını kontrol ediyoruz
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          The road to the <span className={styles.italicText}>depths</span> of the human soul
        </h1>
        <p className={styles.description}>
          We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
        </p>
        
        {/* Buton her zaman görünecek ama ismi veya yönlendirmesi ihtiyaca göre değişebilir */}
        <button 
          className={styles.getStartedBtn} 
          onClick={() => navigate('/psychologists')}
        >
          {isLoggedIn ? "Find a specialist" : "Get started"} 
          <LuArrowUpRight size={22} className={styles.arrowIcon} />
        </button>
      </div>

      <div className={styles.imageContainer}>
        <img src={homeImage} alt="Psychologist" className={styles.mainImage} />
        
        <div className={styles.statCard}>
          <div className={styles.checkIconBox}>
            <FaCheck className={styles.checkIcon} />
          </div>
          <div className={styles.statText}>
            <p className={styles.statLabel}>Experienced psychologists</p>
            <p className={styles.statCount}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;