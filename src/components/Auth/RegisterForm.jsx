import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'; // Eklendi
import { setCredentials } from '../../redux/auth/authSlice'; // Eklendi
import { registerSchema } from './validationSchema';
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from './Auth.module.css';
import { auth } from '../../firebase/config'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterForm = ({onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch(); // Tanımlandı

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        
        await updateProfile(userCredential.user, {
          displayName: values.name
        });

        // REDUX'I GÜNCELLE
        dispatch(setCredentials({
          name: values.name,
          email: userCredential.user.email
        }));

        onClose(); 
      } catch (error) {
        console.error("Kayıt Hatası:", error.message);
      }
    },
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
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.description}>Thank you for your interest! Please provide your information.</p>
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input name="name" placeholder="Name" className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : ''}`} {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <span className={styles.errorText}>{formik.errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <input name="email" placeholder="Email" className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`} {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <span className={styles.errorText}>{formik.errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordWrapper}>
            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`} value={formik.values.password} onChange={handlePasswordChange} onBlur={formik.handleBlur} />
            <button type="button" className={styles.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
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