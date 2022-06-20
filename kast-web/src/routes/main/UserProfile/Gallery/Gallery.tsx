import React from 'react';
import {useStyles} from './Gallery.style';
import Box from '@material-ui/core/Box';

const Gallery = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <span>Gallery</span>
    </Box>
  );
};

export default Gallery;
