import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      [theme.breakpoints.down(950)]: {
        display: 'block',
      },
    },
    swipeRoot: {
      borderRadius: 10,
      height: '100%',
      position: 'relative',
    },
    list: {
      width: '30%',
    },
    fullList: {
      width: 'auto',
      marginRight: 15,
      marginLeft: 50,
      marginTop: 50,
    },
    burger: {
      width: 40,
      height: 40,
    },
    listBlock: {display: 'grid'},
    listItem: {
      margin: 15,
    },
    button: {
      justifyContent: 'flex-end',
    },
    menuItemText: {
      textAlign: 'right',
      fontSize: 26,
      fontWeight: 500,
      textTransform: 'none',
    },
    buttonCircle: {
      marginLeft: 16,
    },
    profileAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    pofileContainer: {
      marginTop: 50,
      marginRight: 15,
      marginLeft: 50,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    avatarIcon: {
      marginLeft: 20,
      width: 45,
      height: 45,
      boxShadow: '0px 0px 10px rgba(97, 0, 255, 0.22)',
    },
    buttonBottom: {
      position: 'absolute',
      display: 'grid',
      bottom: 40,
      marginRight: 15,
      marginLeft: 110,
    },
  }),
);

export {useStyles};
