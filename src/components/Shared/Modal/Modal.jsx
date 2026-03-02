import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root') || document.body;

const Modal = ({ children, onClose }) => {
  // Kapanış animasyonunu kontrol eden state
  const [isClosing, setIsClosing] = useState(false);

  // Kapatma işlemini animasyon süresi kadar geciktiren fonksiyon
  const handleClose = () => {
    setIsClosing(true); // Önce CSS sınıfını değiştir
    setTimeout(() => {
      onClose(); // 300ms sonra (animasyon bitince) bileşeni tamamen kaldır
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') handleClose(); // Burayı güncelledik
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) handleClose(); // Burayı güncelledik
  };

  return createPortal(
    <div 
      className={`${styles.backdrop} ${isClosing ? styles.backdropHidden : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.modalHidden : ''}`}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8L8 24M8 8L24 24" stroke="#191A15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;