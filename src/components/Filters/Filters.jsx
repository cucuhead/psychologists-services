import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/psychologists/psychologistsSlice';
import styles from './Filters.module.css';

const options = [
  'A to Z', 'Z to A', 'Less than 170$', 'Greater than 170$',
  'Popular', 'Not popular', 'Show all'
];

const Filters = ({ currentFilter: externalFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduxFilter = useSelector(state => state.psychologists.filter || 'Show all');
  const dispatch = useDispatch();
  const ref = useRef(null);

  const isControlled = externalFilter !== undefined && onFilterChange !== undefined;
  const currentFilter = isControlled ? externalFilter : reduxFilter;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (option) => {
    if (isControlled) {
      onFilterChange(option);
    } else {
      dispatch(setFilter(option));
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <p className={styles.label}>Filters</p>
      <div className={styles.dropdown} ref={ref}>
        <button
          className={styles.filterBtn}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {currentFilter}
          <span className={`${styles.arrow} ${isOpen ? styles.up : ''}`}>▼</span>
        </button>

        {isOpen && (
          <ul className={styles.optionsList}>
            {options.map(option => (
              <li
                key={option}
                className={`${styles.option} ${currentFilter === option ? styles.active : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;