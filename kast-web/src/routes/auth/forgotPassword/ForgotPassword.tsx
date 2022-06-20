import React from 'react';
import {Field, Formik, FormikState, Form, FormikHelpers} from 'formik';
import styles from './ForgotPassword.module.scss';
import Schema from '../utils/validationSchema';
import {TextField} from 'components';
import {useAuthActions} from 'state/hooks/UseActions';
import AuthLayout from '../common/AuthLayout/AuthLayout';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {useGuard} from 'state/hooks/UseGuard';

interface ForgotPasswordValues {
  email: string;
}
const ForgotPassword: React.FC<FormikState<ForgotPasswordValues>> = () => {
  const {t} = useTranslation('registration');
  const actions = useAuthActions();
  const history = useHistory();
  useGuard({requireAuthenticated: false});
  const initialValues: ForgotPasswordValues = {
    email: '',
  };

  const submit = (
    values: ForgotPasswordValues,
    {setSubmitting}: FormikHelpers<ForgotPasswordValues>,
  ) => {
    setSubmitting(false);
    actions.recoverPassword({
      email: values.email,
    });
  };

  return (
    <AuthLayout title={t('accessRecovery')} topTitle="signUp">
      <Formik
        onSubmit={submit}
        initialValues={initialValues}
        validationSchema={Schema.ForgotPasswordSchema}
      >
        <Form>
          <div className={styles.paper}>
            <div className={styles.subTitle}>
              <span>{t('accessRecoverySubtitle')}</span>
            </div>
            <form className={styles.form} noValidate>
              <div className={styles.fieldContainer}>
                <span className={styles.fieldTitle}>{t('email')}</span>
                <Field
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label={t('email')}
                  id="email"
                  autoComplete="email"
                  as={TextField}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>
                  {t('send')}
                </button>
              </div>
            </form>
          </div>
        </Form>
      </Formik>
      <div className={styles.forgotPass}>
        <span className={styles.forgotPass__text}>{t('rememberAccount')}</span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={styles.forgotPass__link}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.push('/signin');
          }}
        >
          {t('signIn')}
        </a>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
