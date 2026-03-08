import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/psychologists/psychologistsSlice';
import styles from './Filters.module.css';

const options = [
  'A to Z', 'Z to A', 'Less than 10$', 'Greater than 10$', 
  'Popular', 'Not popular', 'Show all'
];

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentFilter = useSelector(state => state.psychologists.filter || 'Show all');
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    dispatch(setFilter(option));
    setIsOpen(false);
  };

  return (
    <div className={styles.filterWrapper}>
      <p className={styles.label}>Filters</p>
      <div className={styles.dropdown}>
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