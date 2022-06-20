import React from 'react';
import {logo} from './assets';

import styles from './assets/Logo.module.scss';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({onClick}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.logo}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <img src={logo} alt="logo" className={styles.logoImg} />
    </div>
  );
};

export default Logo;
