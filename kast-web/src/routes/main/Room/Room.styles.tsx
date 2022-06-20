import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    roomRoot: {
      marginTop: 10,
      padding: 20,
      flex: 1,
      textAlign: 'center',
      background: '#FDFCFE',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'stretch',
      [theme.breakpoints.down('sm')]: {
        height: '35vh',
        display: 'block',
      },
    },
    menuRoot: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      display: 'flex',
      margin: 'auto',
      justifyContent: 'left',
      alignItems: 'flex-start',
    },
    videoContainerLarge: {
      // width: '95%',
      height: '65vh',
      [theme.breakpoints.down('sm')]: {
        height: '20vh',
      },
    },
    videoContainerSmall: {
      width: '100%',
    },
    single: {
      borderRadius: 15,
      width: '95%',
    },
    userNameTitle: {
      textAlign: 'center',
      display: 'block',
      marginTop: 'auto',
    },
    paperRoot: {
      width: 443,
      height: 326,
      marginTop: 181,
      marginRight: 164,
      marginLeft: 60,
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      height: 326,
      marginTop: 50,
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 78,
    },
    card: {
      width: 220,
      // height: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: 50,
      color: '#C82FC6',
    },
    icon: {
      width: 75,
      height: 75,
      marginBottom: 25,
    },
    cardTitle: {
      marginRight: 25,
      marginLeft: 25,
    },
    videoTitle: {
      textAlign: 'center',
      color: 'red',
    },
    largeScreenMedia: {
      maxWidth: 2000,
      width: '100%',
      borderRadius: 15,
      flex: 1,
      position: 'relative',
    },
    backContainer: {
      display: 'flex',
    },
    backButtonWraper: {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    backButton: {
      padding: 0,
      position: 'absolute',
    },
    backButtonIcon: {
      marginRight: 15,
      marginLeft: 40,
    },
    muteButtons: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: 3,
      transition: 'all 1s',
    },
    tabs: {
      border: 'none',
      // color: '#C82FC6',
      [theme.breakpoints.down(1000)]: {
        order: 1,
      },
    },
    tabsRoot: {
      width: 64,
      height: 44,
      padding: 12,
    },
    tabButtonIcon: {
      textTransform: 'capitalize',
      fontSize: 24,
    },
  }),
);

export {useStyles};
