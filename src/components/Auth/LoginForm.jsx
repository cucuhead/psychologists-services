import { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' }, // Login'de 'name' alanını sildim
    validationSchema: loginSchema,
    validateOnChange: false, // Yazarken hata gösterme
    validateOnBlur: true,    // Sadece kutudan çıkınca kontrol et
    onSubmit: (values) => console.log('Login:', values),
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('password', value);
    
    if (formik.errors.password && value.length >= 6) {
      formik.setFieldError('password', undefined);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.description}>
        Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.
      </p>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            name="email"
            placeholder="Email"
            className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <span className={styles.errorText}>{formik.errors.email}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordWrapper}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`}
              value={formik.values.password}
              onChange={handlePasswordChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className={styles.passwordIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className={styles.errorText}>{formik.errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;