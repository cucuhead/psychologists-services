import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists } from '../../redux/psychologists/operations';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard'; // Yeni bileşenimizi import ettik
import { 
  selectAllPsychologists, 
  selectIsLoading, 
  selectHasMore, 
  selectNextIndex 
} from '../../redux/psychologists/selectors';
import { clearPsychologists } from '../../redux/psychologists/psychologistsSlice';
import styles from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const dispatch = useDispatch();
  
  const psychologists = useSelector(selectAllPsychologists);
  const isLoading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);
  const nextIndex = useSelector(selectNextIndex);

  useEffect(() => {
    // Sayfa ilk açıldığında verileri çekiyoruz
    dispatch(fetchPsychologists(0));

    // Sayfadan ayrılınca verileri temizliyoruz
    return () => {
      dispatch(clearPsychologists());
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    
    dispatch(fetchPsychologists(nextIndex)); //
  };

  return (
    <div className={styles.container}>
      {/* İleride buraya Filters bileşeni gelecek */}
      
      <ul className={styles.list}>
        {psychologists && psychologists.map((psychologist, index) => {
          if (!psychologist) return null; // Güvenli render kontrolü

          return (
            <li key={psychologist.id || index} className={styles.item}>
               {/* Eski placeholder yerine gerçek kart bileşenimizi koyduk */}
               <PsychologistCard psychologist={psychologist} />
            </li>
          );
        })}
      </ul>

      {/* Loading durumu için basit bir bildirim */}
      {isLoading && <p className={styles.loading}>Yükleniyor...</p>}

      {/* Daha fazla veri varsa 'Load more' butonunu göster */}
      {hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;