import React from 'react';
import {useStyles} from './Resume.style';
import Box from '@material-ui/core/Box';

const Resume = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <span>Portfolio</span>
    </Box>
  );
};

export default Resume;
