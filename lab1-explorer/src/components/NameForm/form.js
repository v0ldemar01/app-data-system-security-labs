import * as Yup from 'yup';

export const validationSchema = keyName => Yup.object().shape({
  [keyName]: Yup.string()
    .required(`${keyName} is required!`)
    .min(1, `${keyName} cannot less 1 characters!`)
    .max(25, `${keyName} cannot exceed 25 characters!`),
});

export const initializeValues = (keyName, currentName) => ({
  [keyName]: currentName ?? ''
});