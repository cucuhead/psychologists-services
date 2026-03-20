import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const appointmentSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').required('Name is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,13}$/, 'Invalid phone number')
    .required('Phone is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  time: Yup.date().nullable().required('Time is required'),
  comment: Yup.string().min(10, 'Comment is too short').required('Comment is required'),
});