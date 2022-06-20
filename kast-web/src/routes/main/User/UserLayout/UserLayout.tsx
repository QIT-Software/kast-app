import React from 'react';
import {useStyles} from './UserLayout.style';
import {Typography, Box} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {UserBackground} from 'routes/main/User/assets';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from 'state/hooks';
import {RequireLoadable} from 'components';

const UserLayout: React.FC = ({children}) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const history = useHistory();
  return (
    <Box className={classes.root}>
      <Box className={classes.menuContainer}>
        <Box className={classes.titleContainer}>
          <RequireLoadable data={user}>
            {(user) => {
              return (
                <CardMedia
                  className={classes.userBackground}
                  image={UserBackground}
                  title="User Background"
                >
                  <Box className={classes.avatarWrapper}>
                    <Box className={classes.userInfoContainer}>
                      <Typography className={classes.userName}>
                        {user.user.name}
                      </Typography>
                      <Typography className={classes.userName}>
                        Studies at Carleton University
                      </Typography>
                    </Box>
                    <Avatar
                      className={classes.avatarIcon}
                      alt={user.user.name}
                      src={user.user.avatarUrl}
                    />
                  </Box>
                </CardMedia>
              );
            }}
          </RequireLoadable>
        </Box>
        <Box className={classes.navContainer}>
          <Box
            style={{marginBottom: 30, cursor: 'pointer'}}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.push(`/user/my-info`);
            }}
          >
            <Typography className={classes.tabTitle} color="primary">
              My info
            </Typography>
          </Box>
          <Box
            style={{marginBottom: 30, cursor: 'pointer'}}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.push(`/user/impact`);
            }}
          >
            <Typography className={classes.tabTitle} color="primary">
              Impact
            </Typography>
          </Box>
          <Box
            style={{marginBottom: 30, cursor: 'pointer'}}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.push(`/user/resume`);
            }}
          >
            <Typography className={classes.tabTitle} color="primary">
              Resume
            </Typography>
          </Box>
          <Box
            style={{marginBottom: 30, cursor: 'pointer'}}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.push(`/user/gallery`);
            }}
          >
            <Typography className={classes.tabTitle} color="primary">
              Gallery
            </Typography>
          </Box>
          <Box
            style={{marginBottom: 30, cursor: 'pointer'}}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.push(`/user/portfolio`);
            }}
          >
            <Typography className={classes.tabTitle} color="primary">
              Portfolio
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};

export default UserLayout;
