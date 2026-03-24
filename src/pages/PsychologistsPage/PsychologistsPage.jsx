import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists, loadMorePsychologists } from '../../redux/psychologists/operations';
import { clearPsychologists } from '../../redux/psychologists/psychologistsSlice';
import {
  selectAllPsychologists,
  selectIsLoading,
  selectHasMore,
  selectCursor,
  selectFilter,
} from '../../redux/psychologists/selectors';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Shared/Loader/Loader';
import styles from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectAllPsychologists);
  const isLoading    = useSelector(selectIsLoading);
  const hasMore      = useSelector(selectHasMore);
  const cursor       = useSelector(selectCursor);
  const currentFilter = useSelector(selectFilter);

  // Filter değiştiğinde state'i sıfırla ve ilk sayfayı çek
  useEffect(() => {
    dispatch(clearPsychologists());
    dispatch(fetchPsychologists({ filterName: currentFilter }));
  }, [dispatch, currentFilter]);

  const handleLoadMore = () => {
    dispatch(loadMorePsychologists({ filterName: currentFilter, cursor }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <Filters />
      </div>

      {psychologists.length > 0 ? (
        <ul className={styles.list}>
          {psychologists.map((psychologist) => (
            <li key={psychologist._firebaseKey ?? psychologist.name} className={styles.item}>
              <PsychologistCard psychologist={psychologist} />
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && (
          <p className={styles.noResults}>No psychologists found matching this filter.</p>
        )
      )}

      {isLoading && <Loader />}

      {hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;