import React from 'react';
import styles from './CostumButton.module.scss';

interface ButtonProps {
  title: string;
  style?: object;
}

const CostumButton: React.FC<ButtonProps> = ({
  //
  title,
  style,
}) => {
  return (
    <button type="submit" className={styles.button} style={style}>
      {title}
    </button>
  );
};

export default CostumButton;
