import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { LuArrowUpRight } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
// Önemli: assets klasörüne o görseli ekleyip ismini doğru yazmalısın
import homeImage from '../../assets/home-image.jpg'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          The road to the <span className={styles.italicText}>depths</span> of the human soul
        </h1>
        <p className={styles.description}>
          We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
        </p>
        <button 
          className={styles.getStartedBtn} 
          onClick={() => navigate('/psychologists')}
        >
          Get started <LuArrowUpRight size={22} className={styles.arrowIcon} />
        </button>
      </div>

      <div className={styles.imageContainer}>
        <img src={homeImage} alt="Psychologist" className={styles.mainImage} />
        
        {/* Figma'daki 15,000 Kartı (image_810ad7.jpg) */}
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