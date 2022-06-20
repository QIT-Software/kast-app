import React from 'react';

import styles from 'components/Spinner/assets/Spinner.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#fc6767" />
          </filter>
        </defs>
        <circle
          className={styles.spinner}
          style={{
            fill: 'transparent',
            stroke: '#D258D3',
            strokeWidth: 7,
            strokeLinecap: 'round',
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
};

export default Spinner;
