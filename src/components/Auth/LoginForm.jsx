import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 1. Bunu ekledik
import { setCredentials } from '../../redux/auth/authSlice';
import { loginSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Bunu ekledik

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      dispatch(setCredentials({
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid
      }));

      onClose(); 
      navigate('/psychologists'); // 3. Ve bunu ekledik!
    } catch (error) {
      console.error("Giriş Hatası:", error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.description}>Welcome back! Please enter your credentials.</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input 
            {...register("email")}
            placeholder="Email" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>

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