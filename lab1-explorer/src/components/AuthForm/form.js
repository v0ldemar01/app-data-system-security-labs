import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  role: Yup.string()
    .required('Role is required!'),
  password: Yup.string()
    .min(3, 'Password should have at least 3 symbols!')
    .max(100, 'And who will remember so long string!')
    .required('Password is required!')
});

export const initialValues = {
  role: '',
  password: ''
};
