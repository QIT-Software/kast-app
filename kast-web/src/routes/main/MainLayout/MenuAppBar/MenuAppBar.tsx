import React from 'react';
import {useTranslation} from 'react-i18next';
import Logo from 'components/Logo/Logo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useStyles} from './MenuAppBar.styles';
import {useHistory, useLocation} from 'react-router-dom';
import {TabModel} from 'routes/main/MainLayout/MenuAppBar/model';
import {Box, Hidden} from '@material-ui/core';
import {useGuard} from 'state/hooks/UseGuard';
import SwipeMenu from 'components/DrawerMenu/DrawerMenu';
import {useSelector} from 'state/hooks';

const MenuAppBar: React.FC = () => {
  const {t} = useTranslation('menu');
  const participant = useSelector((state) => state.participants);
  const mainName = () => {
    if (participant.inRoom) {
      return 'Back to the meeting';
    }
    return 'Main';
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const guard = useGuard({requireAuthenticated: true});
  const renderUserName = () => {
    if (guard) {
      const {user} = guard;
      // @ts-ignore
      return user.name || 'Profile name';
    }
    return 'Profile name';
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  const classes = useStyles();

  const tabs: TabModel[] = [
    {
      labelKey: mainName(),
      routes: ['/main', '/room'],
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
  ];

  const getSelectedTab = (): number | undefined => {
    for (let i = 0; i < tabs.length; i += 1) {
      // eslint-disable-next-line no-restricted-syntax
      for (const route of tabs[i].routes) {
        if (location.pathname.startsWith(route)) {
          return i;
        }
      }
    }

    return undefined;
  };
  // const [menu, openMenu] = useState<boolean>(false);

  const selectedTab = getSelectedTab();

  return (
    <AppBar className={classes.root} elevation={0}>
      <Logo onClick={() => history.push('/main')} />
      <Hidden only={['xs', 'sm']}>
        <Toolbar className={classes.toolbar}>
          <Tabs
            className={classes.tabs}
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {tabs.map(({labelKey, routes}) => (
              <Tab
                key={routes[0]}
                style={{color: '#C82FC6'}}
                label={t(labelKey)}
                onClick={() => history.push(routes[0])}
              />
            ))}
          </Tabs>
          <Box className={classes.profile}>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              {renderUserName()}
              <AccountCircle className={classes.buttonCircle} />
            </Button>
            <Menu
              className={classes.profilePopupWrapper}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                className={classes.profilePopupItem}
                onClick={() => {
                  handleClose();
                  history.push('/userprofile');
                }}
              >
                <AccountCircle className={classes.profilePopupIcon} />
                {t('profile')}
              </MenuItem>
              <MenuItem
                className={classes.profilePopupItem}
                onClick={() => {
                  handleClose();
                  history.push('/logout');
                }}
              >
                <ExitToAppRoundedIcon className={classes.profilePopupIcon} />
                {t('logout')}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Hidden>
      <SwipeMenu profileName={renderUserName()} />
    </AppBar>
  );
};

export default MenuAppBar;
