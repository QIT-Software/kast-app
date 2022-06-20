import React from 'react';
import {useStyles} from 'routes/main/Room/RoomMenu/RoomMenu.styles';
import Box from '@material-ui/core/Box';
import ChatTab from 'routes/main/Room/RoomMenu/Chat/Chat';

const RoomMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} borderColor="primary" border={1} borderRadius={15}>
      <div className={classes.container}>
        <ChatTab />
      </div>
    </Box>
  );
};

export default RoomMenu;
