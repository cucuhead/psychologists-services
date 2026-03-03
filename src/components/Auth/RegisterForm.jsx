import { useState } from 'react';
import { useForm } from 'react-hook-form'; // Formik yerine eklendi
import { yupResolver } from '@hookform/resolvers/yup'; // Validasyon bağlayıcısı
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/auth/authSlice';
import { registerSchema } from './validationSchema'; // Mevcut yup şemanı kullanıyoruz
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';
import { auth } from '../../firebase/config'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // React Hook Form kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema), // Mevcut Yup şemanı buraya bağladık
    mode: 'onTouched' // Kullanıcı inputtan çıktığı an hata kontrolü yapar
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      await updateProfile(userCredential.user, {
        displayName: data.name
      });

      dispatch(setCredentials({
        name: data.name,
        email: userCredential.user.email
      }));

      onClose(); 
    } catch (error) {
      console.error("Kayıt Hatası:", error.message);
      // Buraya bir toast bildirim veya genel hata mesajı eklenebilir
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.description}>Thank you for your interest! Please provide your information.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Name Input */}
        <div className={styles.inputGroup}>
          <input 
            {...register("name")} 
            placeholder="Name" 
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`} 
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </div>

        {/* Email Input */}
        <div className={styles.inputGroup}>
          <input 
            {...register("email")} 
            placeholder="Email" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <div className={styles.passwordWrapper}>
            <input 
              {...register("password")}
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`} 
            />
            <button 
              type="button" 
              className={styles.passwordIcon} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        <button type="submit" className={styles.submitBtn}>Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;