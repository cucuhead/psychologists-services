import { useState } from 'react';
import { useForm } from 'react-hook-form'; // Formik yerine eklendi
import { yupResolver } from '@hookform/resolvers/yup'; // Resolver eklendi
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/auth/authSlice';
import { loginSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // React Hook Form kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched', // Hataları kullanıcı inputtan ayrıldığında gösterir
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // REDUX'I GÜNCELLE
      dispatch(setCredentials({
        name: userCredential.user.displayName,
        email: userCredential.user.email
      }));

      onClose(); 
    } catch (error) {
      console.error("Giriş Hatası:", error.message);
      // Not: İstersen buraya toast bildirimi ekleyebiliriz
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.description}>Welcome back! Please enter your credentials.</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Email Field */}
        <div className={styles.inputGroup}>
          <input 
            {...register("email")}
            placeholder="Email" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>

        {/* Password Field */}
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

        <button type="submit" className={styles.submitBtn}>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;