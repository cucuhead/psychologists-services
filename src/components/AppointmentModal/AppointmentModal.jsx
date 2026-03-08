import React from 'react';
import { useForm, Controller } from 'react-hook-form'; // Controller eklendi
import DatePicker from "react-datepicker"; // Saat seçici kütüphanesi
import "react-datepicker/dist/react-datepicker.css"; // Kütüphane stilleri
import Modal from '../Shared/Modal/Modal';
import styles from './AppointmentModal.module.css';

const AppointmentModal = ({ psychologist, onClose }) => {
  // control nesnesini react-datepicker gibi dış kütüphanelerle bağlamak için kullanıyoruz
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    // Veriyi gönderirken saati istediğin formata çevirebilirsin
    console.log("Randevu Bilgileri:", data);
    alert("Randevu talebiniz başarıyla gönderildi!");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Make an appointment with a psychologists</h2>
        <p className={styles.description}>
          You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist.
        </p>

        <div className={styles.psychologistInfo}>
          <img src={psychologist.avatar_url} alt={psychologist.name} className={styles.avatar} />
          <div className={styles.infoText}>
            <span className={styles.label}>Your psychologists</span>
            <h3 className={styles.psycName}>{psychologist.name}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input 
              {...register("name", { required: "Name is required" })} 
              placeholder="Name" 
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input 
                {...register("phone", { 
                  required: "Phone is required",
                  pattern: { value: /^\+?[0-9]{10,12}$/, message: "Invalid phone number" }
                })} 
                placeholder="+380" 
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              {/* Figma'daki özel saat listesi için Controller kullanıyoruz */}
              <Controller
                control={control}
                name="time"
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30} // Figma'daki 30 dk aralıklar
                    timeCaption="Meeting time"
                    dateFormat="HH:mm"
                    placeholderText="00:00"
                    className={`${styles.timeInput} ${errors.time ? styles.inputError : ''}`}
                  />
                )}
              />
              {errors.time && <span className={styles.errorMessage}>{errors.time.message}</span>}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })} 
              type="email" 
              placeholder="Email" 
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          </div>
          
          <textarea 
            {...register("comment")} 
            placeholder="Comment" 
            rows="4" 
            className={styles.textarea}
          />

          <button type="submit" className={styles.sendBtn}>Send</button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;