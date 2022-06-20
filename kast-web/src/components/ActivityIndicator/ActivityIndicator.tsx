import React from 'react';
import {useStyles} from './ActivityIndicator.styles';
import Box from '@material-ui/core/Box';
import Spinner from 'components/Spinner/Spinner';

const ActivityIndicatorFill: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Spinner />
    </Box>
  );
};

export default ActivityIndicatorFill;
