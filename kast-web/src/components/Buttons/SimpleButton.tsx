import React from 'react';
import {Button, Typography} from '@material-ui/core';

interface SimpleButtonProps {
  title: string;
  action?: () => void;
  link?: string;
  style?: object;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  action,
  link,
  style,
  type,
}) => {
  return (
    <Button
      onClick={action}
      // link ? href = link : null
      href={link}
      type={type}
      style={{
        width: 400,
        borderRadius: 15,
        backgroundColor: '#C82FC6',
        color: '#fff',
        ...style,
      }}
    >
      <Typography variant="h6"> {title}</Typography>
    </Button>
  );
};

export default SimpleButton;
