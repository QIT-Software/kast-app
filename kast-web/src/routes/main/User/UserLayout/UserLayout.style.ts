import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      background: '#FDFCFE',
    },
    menuContainer: {
      display: 'flex',
      flexDirection: 'column',
      alightItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      display: 'flex',
      alightItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    listContainer: {marginTop: 50},

    content: {width: '100%'},
    navContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '30%',
      marginRight: '30%',
    },
    tabTitle: {
      fontWeight: 500,
      fontSize: 26,
    },
    userBackground: {
      width: 850,
      height: 140,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      textAlign: 'start',
    },
    avatarWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 12,
      alignItems: 'center',
    },
    userInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      marginRight: 10,
    },
    avatarIcon: {
      marginRight: 20,
      width: 100,
      height: 100,
    },
    userName: {
      fontWeight: 500,
      fontSize: 22,
      color: '#FFFFFF',
    },
  }),
);

export {useStyles};
