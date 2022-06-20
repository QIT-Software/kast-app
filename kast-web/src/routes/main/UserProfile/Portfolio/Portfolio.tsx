import React from 'react';
import {useStyles} from './Portfolio.style';
import Box from '@material-ui/core/Box';

const Portfolio = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <span>Portfolio</span>
    </Box>
  );
};

export default Portfolio;
