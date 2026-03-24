import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { addToFavorites, removeFromFavorites } from '../../redux/favorites/favoritesSlice';
import { selectAllFavorites } from '../../redux/favorites/selectors';
import toast from 'react-hot-toast';

import styles from './PsychologistCard.module.css';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import Modal from '../Shared/Modal/Modal';
import LoginForm from '../Auth/LoginForm';

const PsychologistCard = ({ psychologist }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectAllFavorites);

  const psychologistId = String(
    psychologist._firebaseKey ?? psychologist.id ?? psychologist.name
  );

  const isFavorite =
    isLoggedIn &&
    favorites.some(
      (item) =>
        String(item._firebaseKey ?? item.id ?? item.name) === psychologistId
    );

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to add psychologists to your favorites!', {
        icon: '🔒',
        duration: 3000,
      });
      setIsLoginModalOpen(true);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites({ id: psychologistId, uid: user.uid }));
      toast.success('Removed from favorites');
    } else {
      dispatch(
        addToFavorites({ ...psychologist, id: psychologistId, uid: user.uid })
      );
      toast.success('Added to favorites! ❤️');
    }
  };

  const handleOpenModal = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('Please log in to make an appointment!', {
        icon: '🔒',
        duration: 3000,
      });
      setIsLoginModalOpen(true);
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <span className={styles.onlineStatus}></span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleInfo}>
            <p className={styles.role}>Psychologist</p>
            <h2 className={styles.name}>{psychologist.name}</h2>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <FaStar className={styles.starIcon} />
              <span>Rating: {psychologist.rating}</span>
            </div>

            <div className={styles.divider}>|</div>

            <div className={styles.statItem}>
              <span>
                Price / 1 hour:{' '}
                <span className={styles.price}>
                  {psychologist.price_per_hour}$
                </span>
              </span>
            </div>

            <button
              className={styles.favoriteBtn}
              onClick={handleFavoriteClick}
              type="button"
            >
              {isFavorite ? (
                <FaHeart className={styles.heartIconActive} />
              ) : (
                <FaRegHeart className={styles.heartIconDefault} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.tags}>
          <div className={styles.tag}>
            Experience: <span>{psychologist.experience}</span>
          </div>
          <div className={styles.tag}>
            License: <span>{psychologist.license}</span>
          </div>
          <div className={styles.tag}>
            Specialization: <span>{psychologist.specialization}</span>
          </div>
          <div className={styles.tag}>
            Initial_consultation:{' '}
            <span>{psychologist.initial_consultation}</span>
          </div>
        </div>

        <p className={styles.description}>{psychologist.about}</p>

        {!isExpanded ? (
          <button
            className={styles.readMore}
            onClick={() => setIsExpanded(true)}
            type="button"
          >
            Read more
          </button>
        ) : (
          <div className={styles.expandedContent}>
            <ul className={styles.reviewsList}>
              {psychologist.reviews?.map((review, index) => (
                <li
                  key={`${review.reviewer}-${index}`}
                  className={styles.reviewItem}
                >
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerAvatar}>
                      {review.reviewer?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h4 className={styles.reviewerName}>
                        {review.reviewer || 'Anonymous'}
                      </h4>
                      <div className={styles.reviewerRating}>
                        <FaStar className={styles.starIconSmall} />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.comment}>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button
              className={styles.appointmentBtn}
              onClick={handleOpenModal}
              type="button"
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AppointmentModal
          psychologist={psychologist}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isLoginModalOpen && (
        <Modal onClose={() => setIsLoginModalOpen(false)}>
          <LoginForm
            onClose={() => setIsLoginModalOpen(false)}
            redirectTo={window.location.pathname}
          />
        </Modal>
      )}
    </div>
  );
};

export default PsychologistCard;