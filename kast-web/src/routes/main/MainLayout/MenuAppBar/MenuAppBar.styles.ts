import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'static',
      backgroundColor: '#fff',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'initial',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 40,
      paddingRight: 20,
    },
    toolbar: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      textColor: '#C82FC6',
      hight: '100px',
      flexWrap: 'wrap',
    },
    tabs: {
      border: 'none',
      // color: '#C82FC6',
      [theme.breakpoints.down(1000)]: {
        order: 1,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    buttonCircle: {
      marginLeft: 16,
    },
    title: {
      flexGrow: 1,
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
    },
    profilePopupWrapper: {
      boxShadow: '0px 4px 10px rgba(72, 104, 255, 0.19)',
      borderRadius: 10,
    },
    profilePopupItem: {
      width: 175,

      // color: '#C82FC6',
      border: '1px solid #fff',
    },
    profilePopupIcon: {
      marginRight: 16,
    },
    burger: {
      width: 40,
      height: 40,
    },
  }),
);

export {useStyles};
