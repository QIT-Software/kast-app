import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});
