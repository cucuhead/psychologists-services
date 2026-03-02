import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

// Modal'ı DOM'un en üstüne (body yanına) ışınlamak için Portal kullanıyoruz
const modalRoot = document.querySelector('#modal-root') || document.body;

const Modal = ({ children, onClose }) => {
  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Modal kapandığında event listener'ı temizle (Memory leak önlemi)
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Backdrop (arka plan) tıklamasıyla kapatma
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          {/* Buraya bir X ikonu koyabilirsin */}
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;