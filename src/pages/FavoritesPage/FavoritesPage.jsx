import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllFavorites, selectFavoritesFilter } from '../../redux/favorites/selectors';
import { setFavoritesFilter } from '../../redux/favorites/favoritesSlice';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import Filters from '../../components/Filters/Filters';
import styles from './FavoritesPage.module.css';

const PAGE_SIZE = 3;

const filterStrategies = {
  'A to Z': (list) => [...list].sort((a, b) => a.name.localeCompare(b.name)),
  'Z to A': (list) => [...list].sort((a, b) => b.name.localeCompare(a.name)),
  'Less than 170$': (list) => list.filter(p => Number(p.price_per_hour) <= 170),
  'Greater than 170$': (list) => list.filter(p => Number(p.price_per_hour) > 170),
  'Popular': (list) => list
    .filter(p => Number(p.rating) >= 4.7)
    .sort((a, b) => Number(b.rating) - Number(a.rating)),
  'Not popular': (list) => list
    .filter(p => Number(p.rating) < 4.7)
    .sort((a, b) => Number(a.rating) - Number(b.rating)),
  'Show all': (list) => list,
};

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  const currentFilter = useSelector(selectFavoritesFilter);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filtered = useMemo(() => {
    const strategy = filterStrategies[currentFilter] || filterStrategies['Show all'];
    return strategy(favorites);
  }, [favorites, currentFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (filter) => {
    dispatch(setFavoritesFilter(filter));
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <Filters currentFilter={currentFilter} onFilterChange={handleFilterChange} />
      </div>

      {visible.length > 0 ? (
        <ul className={styles.list}>
          {visible.map((psychologist) => (
            <li key={psychologist._firebaseKey ?? psychologist.id ?? psychologist.name}>
              <PsychologistCard psychologist={psychologist} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            {favorites.length === 0
              ? "You haven't added anyone to your favorites yet."
              : "No psychologists found matching this filter."}
          </p>
        </div>
      )}

      {hasMore && (
        <button
          className={styles.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default FavoritesPage;