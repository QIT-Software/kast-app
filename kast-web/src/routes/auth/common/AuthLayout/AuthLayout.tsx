import React, {ReactElement} from 'react';
import styles from './AuthLayout.module.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useTranslation} from 'react-i18next';
import {Link, useLocation} from 'react-router-dom';
import {stringifyUrl, parse} from 'query-string';

interface AuthLayoutProps {
  topTitle: string;
  title: string;
  subTitle?: string;
  bottomElements?: () => ReactElement;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({title, topTitle, children}) => {
  // TODO FIX
  const {t} = useTranslation('registration');
  const location = useLocation();

  const {returnUrl} = parse(location.search);

  // const history = useHistory();
  const tip: () => any = () => {
    return (
      <div className={styles.authHeader}>
        <span className={styles.authHeader__text}>
          {topTitle === 'signUp' ? t('noAccount') : t('alreadyMember')}
        </span>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        {topTitle === 'signUp' ? (
          <Link
            to={stringifyUrl({
              url: '/signup',
              query: {returnUrl},
            })}
            className={styles.authHeader__link}
          >
            {t('signUp')}
          </Link>
        ) : (
          <Link
            to={stringifyUrl({
              url: '/signin',
              query: {returnUrl},
            })}
            className={styles.authHeader__link}
          >
            {t('signIn')}
          </Link>
        )}
      </div>
    );
  };
  // eslint-disable-next-line no-console
  console.log(title);

  return (
    <div className={styles.root}>
      <CssBaseline />
      <div className={styles.image} />
      <div className={styles.contentContainer}>
        <div className={styles.tip}>{tip()}</div>
        <div className={styles.mainContentContainer}>
          <div className={styles.mainContent}>
            <div className={styles.mainContent__logo} />
            <div className={styles.mainContent__form}>
              <div className={styles.paper}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
