import React from 'react';
import {useStyles} from './Translation.styles';
import {Box} from '@material-ui/core';

const TranslationTab: React.FC = () => {
  const classes = useStyles();

  return <Box className={classes.messageContainer}>Translation</Box>;
};

export default TranslationTab;
