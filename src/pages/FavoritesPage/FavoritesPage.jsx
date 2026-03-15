import { useSelector } from 'react-redux';
import { selectAllFavorites } from '../../redux/favorites/selectors';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import styles from './FavoritesPage.module.css'; // Psikolog listesiyle aynı stilleri kullanabilirsin

const FavoritesPage = () => {
  const favorites = useSelector(selectAllFavorites);

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <ul className={styles.list}>
          {favorites.map((psychologist) => (
            <li key={psychologist.id || psychologist.name}>
              <PsychologistCard psychologist={psychologist} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <p>Henüz favori listenize kimseyi eklemediniz.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;