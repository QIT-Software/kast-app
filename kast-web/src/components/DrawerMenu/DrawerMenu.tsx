import React, {useEffect} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {IconButton, Button, Box, Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import burger from './assets/burger.png';
import {useStyles} from './DrawerManu.styles';
import {useHistory} from 'react-router-dom';
import {useAuthActions, useUserProfileActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {RequireLoadable} from 'components/index';
import {useTranslation} from 'react-i18next';

type Anchor = 'right';
const DrawerMenu: React.FC<{profileName: string}> = ({profileName}) => {
  const {t} = useTranslation('menu');
  const participant = useSelector((state) => state.participants);
  const mainName = () => {
    if (participant.inRoom) {
      return 'Back to the meeting';
    }
    return 'Main';
  };

  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const profileActions = useUserProfileActions();
  const authActions = useAuthActions();
  useEffect(() => {
    profileActions.fetchUserProfile();
  }, []);
  const profile = useSelector((state) => state.userProfile);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  // @ts-ignore
  const list = (anchor: Anchor) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.listBlock}>
        {[
          {
            labelKey: mainName(),
            routes: ['/main'],
          },
          {
            labelKey: t('bookmarks'),
            routes: ['/bookmarks'],
          },
          {
            labelKey: t('files'),
            routes: ['/files'],
          },
          {
            labelKey: t('records'),
            routes: ['/records'],
          },
        ].map((el) => (
          <Button
            className={classes.button}
            onClick={() => {
              history.push(`${el.routes}`);
            }}
          >
            <span className={classes.menuItemText}>{el.labelKey}</span>
          </Button>
        ))}
      </List>
    </div>
  );

  return (
    <Box className={classes.root}>
      <React.Fragment key="right">
        <IconButton className={classes.burger} onClick={toggleDrawer('right', true)}>
          <div>
            <img src={burger} alt="" className={classes.burger} />
          </div>
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
        >
          <Box className={classes.swipeRoot}>
            <RequireLoadable data={profile}>
              {(user) => {
                return (
                  <Button
                    className={classes.button}
                    onClick={() => {
                      history.push(`/userProfile/my-info`);
                    }}
                  >
                    <Box className={classes.pofileContainer}>
                      <span className={classes.menuItemText}>{profileName}</span>
                      <Avatar
                        className={classes.avatarIcon}
                        alt={user.name}
                        src={user.avatarUrl}
                      />
                    </Box>
                  </Button>
                );
              }}
            </RequireLoadable>

            {list('right')}

            <Button
              className={classes.buttonBottom}
              onClick={() => {
                authActions.logout();
              }}
            >
              <span className={classes.menuItemText}>Log Out</span>
            </Button>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </Box>
  );
};

export default DrawerMenu;
