import React from 'react';
import {useStyles} from './Room.styles';
import Box from '@material-ui/core/Box';
import backArrow from 'routes/main/Room/assets/others/back_arrow.svg';
import {IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from 'react-i18next';

const RoomError: React.FC = () => {
  const classes = useStyles();
  const {t} = useTranslation('room');
  return (
    <>
      <div className={classes.backButtonWraper}>
        <IconButton color="primary" aria-label="invite" className={classes.backButton}>
          <img src={backArrow} alt="backArrow" className={classes.backButtonIcon} />
          <Typography variant="h4" component="h2" align="justify">
            {t('back')}
          </Typography>
        </IconButton>
      </div>
      <Box className={classes.roomRoot} />
    </>
  );
};

export default RoomError;
