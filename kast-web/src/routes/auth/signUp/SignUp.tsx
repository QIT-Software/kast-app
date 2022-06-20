import React from 'react';
import {Field, Form, Formik, FormikState} from 'formik';
import styles from './SignUp.module.scss';
import Schema from '../utils/validationSchema';
import {TextField} from 'components';
import {useAuthActions} from 'state/hooks/UseActions';
import {useTranslation, Trans} from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, useLocation} from 'react-router-dom';
import {stringifyUrl, parse} from 'query-string';
import {Logo} from 'routes/auth/common/AuthLayout/assets';

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  referralCode: string | undefined;
}

const SignUp: React.FC<FormikState<SignUpValues>> = () => {
  const {t} = useTranslation('registration');
  const actions = useAuthActions();
  const location = useLocation();
  const {referralCode, returnUrl} = parse(location.search);

  const initialValues: SignUpValues = {
    password: '',
    email: '',
    confirmPassword: '',
    name: '',
    terms: false,
    referralCode: (referralCode as string) || '',
  };

  const logoContainer: () => any = () => {
    return (
      <div className={styles.logo}>
        <img src={Logo} alt="" className={styles.logoImg} />
      </div>
    );
  };

  const titleComponent = () => {
    return (
      <div className={styles.titleContainer}>
        <h2 className={styles.titleText}>{t('signUp')}</h2>
      </div>
    );
  };

  const tip: () => any = () => {
    return (
      <div className={styles.authHeader}>
        <span className={styles.authHeader__text}>{t('alreadyMember')}</span>
        <Link
          to={stringifyUrl({
            url: '/signin',
            query: {returnUrl},
          })}
          className={styles.authHeader__link}
        >
          {t('signIn')}
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.image} />
      <div className={styles.mainContent}>
        <div className={styles.tip}>{tip()}</div>
        <div className={styles.paper}>
          {logoContainer()}
          {titleComponent()}
          <Formik
            initialValues={initialValues}
            validationSchema={Schema.SignUpSchema}
            onSubmit={(values, formActions) => {
              actions.registerUser(values, returnUrl as string | undefined);
              formActions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form className={styles.form} noValidate onSubmit={props.handleSubmit}>
                <div className={styles.firstLine}>
                  <div className={styles.fieldContainer}>
                    <span className={styles.fieldTitle}>{t('referral')}</span>
                    <Field
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="referralCode"
                      label={t('referral')}
                      id="referralCode"
                      as={TextField}
                    />
                  </div>
                </div>
                <div className={styles.firstLine}>
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
                </div>
                <div className={styles.firstLine}>
                  <div className={styles.fieldContainer}>
                    <span className={styles.fieldTitle}>{t('name')}</span>
                    <Field
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="name"
                      label={t('name')}
                      id="name"
                      autoComplete="name"
                      as={TextField}
                    />
                  </div>
                </div>
                <div className={styles.secondLine}>
                  <div className={styles.fieldContainer__double}>
                    <span className={styles.fieldTitle}>{t('password')}</span>
                    <Field
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={t('password')}
                      type="password"
                      id="password"
                      as={TextField}
                    />
                  </div>
                  <div className={styles.fieldContainer__double}>
                    <span className={styles.fieldTitle}>{t('confirmPassword')}</span>
                    <Field
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label={t('confirmPassword')}
                      type="password"
                      id="confirmPassword"
                      as={TextField}
                    />
                  </div>
                </div>
                <div className={styles.privacyContainer}>
                  <div className={styles.forgotPass}>
                    <span className={styles.forgotPass__text}>
                      {t('forgotPassword')}?
                    </span>
                    <Link to="/forgotpassword" className={styles.forgotPass__link}>
                      {t('Restore')}
                    </Link>
                  </div>

                  <FormControlLabel
                    control={
                      <Checkbox
                        id="terms"
                        color="primary"
                        checked={props.values.terms}
                        onChange={(_, checked) => props.setFieldValue('terms', checked)}
                      />
                    }
                    label={
                      <Trans i18nKey="registration:termsPrivacy">
                        <span className={styles.rememberMe} />
                        <Link to="/signup" className={styles.forgotPass__link} />
                        <span className={styles.rememberMe} />
                        <Link to="/signup" className={styles.forgotPass__link} />
                      </Trans>
                    }
                    className={styles.radioContainer}
                  />
                </div>
                {props.errors.terms && (
                  <span style={{color: 'red'}}>
                    You should accept terms and privacy policy
                  </span>
                )}

                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.button}>
                    {t('signUp')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
