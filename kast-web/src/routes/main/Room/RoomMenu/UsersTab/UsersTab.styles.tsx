import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userContainer: {
      padding: 20,
      height: '100%',
      borderStyle: 'solid',
      borderColor: '#CC3CCA',
      borderWidth: '1px',
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '25%',
      flexGrow: 0,
      // minWidth: 300,
      [theme.breakpoints.down('sm')]: {
        order: -1,
        marginLeft: 0,
        height: 500,
      },
    },
    listPointer: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: '#D258D3',
      marginRight: 5,
    },
    userItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    deviceIcon: {
      width: 25,
      height: 25,
      marginLeft: 15,
      objectFit: 'cover',
    },
    userName: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 18,
      color: '#D258D3',
    },
    menuIcon: {
      width: 10,
      height: 10,
    },
  }),
);
