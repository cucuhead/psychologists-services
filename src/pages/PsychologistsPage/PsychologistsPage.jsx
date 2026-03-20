import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists } from '../../redux/psychologists/operations';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Shared/Loader/Loader';
import {
  selectAllPsychologists,
  selectIsLoading,
} from '../../redux/psychologists/selectors';
import { clearPsychologists } from '../../redux/psychologists/psychologistsSlice';
import styles from './PsychologistsPage.module.css';

const PAGE_SIZE = 3;

const filterStrategies = {
  'A to Z': (list) => [...list].sort((a, b) => a.name.localeCompare(b.name)),
  'Z to A': (list) => [...list].sort((a, b) => b.name.localeCompare(a.name)),
  'Less than 10$': (list) => list.filter(p => Number(p.price_per_hour) < 10),
  'Greater than 10$': (list) => list.filter(p => Number(p.price_per_hour) > 10),
  'Popular': (list) => list
    .filter(p => Number(p.rating) >= 4.7)
    .sort((a, b) => Number(b.rating) - Number(a.rating)),
  'Not popular': (list) => list
    .filter(p => Number(p.rating) < 4.7)
    .sort((a, b) => Number(a.rating) - Number(b.rating)),
  'Show all': (list) => list,
};

const PsychologistsPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectAllPsychologists);
  const isLoading = useSelector(selectIsLoading);
  const currentFilter = useSelector((state) => state.psychologists.filter || 'Show all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    dispatch(clearPsychologists());
    dispatch(fetchPsychologists());
  }, [dispatch]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter]);

  const filteredAndSorted = useMemo(() => {
    const strategy = filterStrategies[currentFilter] || filterStrategies['Show all'];
    return strategy(psychologists).map(p => ({
      ...p,
      rating: Number(p.rating).toFixed(2),
    }));
  }, [psychologists, currentFilter]);

  const psychologistsToShow = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <Filters />
      </div>

      {psychologistsToShow.length > 0 ? (
        <ul className={styles.list}>
          {psychologistsToShow.map((psychologist, index) => (
            <li key={`${psychologist.id ?? psychologist.name}-${index}`} className={styles.item}>
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