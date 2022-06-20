import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  name: Yup.string().required('Required').trim('Not empty').required('Required'),
  password: Yup.string()
    .required('Required')
    .trim('Not empty')
    .min(3, 'Password should be more then 3 symbols '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords does not match')
    .required('Password confirm is required'),
  terms: Yup.boolean().oneOf([true]).required('Required'),
  referral: Yup.string(),
});
