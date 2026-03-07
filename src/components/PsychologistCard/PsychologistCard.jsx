import { useState } from 'react';
import styles from './PsychologistCard.module.css';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const PsychologistCard = ({ psychologist }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img src={psychologist.avatar_url} alt={psychologist.name} className={styles.avatar} />
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
              <span>Price / 1 hour: <span className={styles.price}>{psychologist.price_per_hour}$</span></span>
            </div>
            <button className={styles.favoriteBtn} onClick={() => setIsFavorite(!isFavorite)}>
              {isFavorite ? <FaHeart className={styles.heartIconActive} /> : <FaRegHeart />}
            </button>
          </div>
        </div>

        <div className={styles.tags}>
          <div className={styles.tag}>Experience: <span>{psychologist.experience}</span></div>
          <div className={styles.tag}>License: <span>{psychologist.license}</span></div>
          <div className={styles.tag}>Specialization: <span>{psychologist.specialization}</span></div>
          <div className={styles.tag}>Initial_consultation: <span>{psychologist.initial_consultation}</span></div>
        </div>

        <p className={styles.description}>{psychologist.about}</p>

        {!isExpanded ? (
          <button className={styles.readMore} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        ) : (
          <div className={styles.expandedContent}>
            <ul className={styles.reviewsList}>
              {psychologist.reviews?.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerAvatar}>
                      {/* Firebase'den gelen 'reviewer' alanını kullanıyoruz */}
                      {review.reviewer?.charAt(0) || "U"} 
                    </div>
                    <div>
                      <h4 className={styles.reviewerName}>{review.reviewer || "Anonymous"}</h4>
                      <div className={styles.reviewerRating}>
                        <FaStar className={styles.starIconSmall} />
                        {/* Firebase'den gelen 'rating' alanını kullanıyoruz */}
                        <span>{review.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.comment}>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button className={styles.appointmentBtn}>Make an appointment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologistCard;