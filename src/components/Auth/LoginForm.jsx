import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations';
import { loginSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';
import toast from 'react-hot-toast';

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(logIn({ email: data.email, password: data.password })).unwrap();
      toast.success(`Welcome back, ${result.displayName || 'User'}!`);
      onClose();
      navigate('/psychologists');
    } catch (error) {
      if (error.includes('invalid-credential')) {
        toast.error("Invalid email or password.");
      } else if (error.includes('too-many-requests')) {
        toast.error("Too many failed attempts. Try again later.");
      } else {
        toast.error("Login failed. Please try again.");
      }
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

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;