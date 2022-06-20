import React from 'react';
import {Field, Formik, FormikState} from 'formik';
import styles from '../signUp/SignUp.module.scss';
import Schema from '../utils/validationSchema';
import {TextField} from 'components';
import {useAuthActions} from 'state/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useGuard} from 'state/hooks/UseGuard';
import {Link, useLocation} from 'react-router-dom';
import {parse, stringifyUrl} from 'query-string';
import {Logo} from 'routes/auth/common/AuthLayout/assets';

interface LoginFormValues {
  email: string;
  password: string;
}

const SignIn: React.FC<FormikState<LoginFormValues>> = () => {
  const {t} = useTranslation('registration');
  const actions = useAuthActions();
  useGuard({requireAuthenticated: false});

  const location = useLocation();

  const {returnUrl} = parse(location.search);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const logoContainer: () => any = () => {
    return (
      <div className={styles.logo}>
        <img src={Logo} alt="" className={styles.logoImg} />
      </div>
    );
  };
  const tip: () => any = () => {
    return (
      <div className={styles.authHeader}>
        <span className={styles.authHeader__text}>{t('alreadyMember')}</span>
        <Link
          to={stringifyUrl({
            url: '/signup',
            query: {returnUrl},
          })}
          className={styles.authHeader__link}
        >
          {t('signUp')}
        </Link>
      </div>
    );
  };

  const titleComponent = () => {
    return (
      <div className={styles.titleContainer}>
        <h2 className={styles.titleText}>{t('signIn')}</h2>
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
            validationSchema={Schema.LoginSchema}
            onSubmit={(values, formActions) => {
              formActions.setSubmitting(false);
              actions.login(values, returnUrl as string | undefined);
            }}
          >
            {(props) => (
              <div className={styles.paper}>
                <form className={styles.form} noValidate onSubmit={props.handleSubmit}>
                  <div className={styles.fieldContainer}>
                    <span className={styles.fieldTitle}>{t('email')}</span>
                    <Field
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="email"
                      label={t('email')}
                      id="email"
                      type="email"
                      autoComplete="email"
                      as={TextField}
                    />
                  </div>
                  <div className={styles.fieldContainer}>
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
                      control={<Checkbox value="privacy" color="primary" />}
                      label={<span className={styles.rememberMe}>{t('stayIn')}</span>}
                      className={styles.radioContainer}
                    />
                  </div>
                  <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button}>
                      {t('signIn')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
