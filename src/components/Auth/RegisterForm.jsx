import { useState } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    validateOnChange: false, // Yazarken hata gösterme
    validateOnBlur: true,    // Sadece kutudan çıkınca kontrol et
    onSubmit: (values) => console.log('Register:', values),
  });

  // Şifre değişimini takip eden özel fonksiyon
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('password', value);
    
    // Eğer hata varsa ve kullanıcı 6 karaktere ulaştıysa hatayı anında sil
    if (formik.errors.password && value.length >= 6) {
      formik.setFieldError('password', undefined);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.description}>
        Thank you for your interest in our platform! In order to register, we need bome information.
      </p>
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input 
            name="name" 
            placeholder="Name" 
            className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : ''}`} 
            {...formik.getFieldProps('name')} 
          />
          {formik.touched.name && formik.errors.name && <span className={styles.errorText}>{formik.errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input 
            name="email" 
            placeholder="Email" 
            className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`} 
            {...formik.getFieldProps('email')} 
          />
          {formik.touched.email && formik.errors.email && <span className={styles.errorText}>{formik.errors.email}</span>}
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
          {formik.touched.password && formik.errors.password && <span className={styles.errorText}>{formik.errors.password}</span>}
        </div>

        <button type="submit" className={styles.submitBtn}>Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;