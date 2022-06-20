import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperRoot: {
      height: '70vh',
      paddingTop: 20,
      borderRadius: 20,
      borderColor: '#C82FC6',
      borderStyle: 'solid',
      borderWidth: 1,
      width: 443,
      marginTop: 50,
      color: '#C82FC6',
      background: 'transparent',
      [theme.breakpoints.down(1300)]: {
        display: 'none',
      },
    },
    cardTitle: {
      marginRight: 25,
      marginLeft: 25,
    },
    streamListRoot: {
      height: 60,
      display: 'flex',
      borderBottom: '1px solid #FFCCFE',
      borderWidth: 2,
      cursor: 'pointer',
      padding: 10,
    },
    streamListItem: {
      display: 'block',
    },
    streamTypeIcon: {
      width: 50,
      height: 50,
    },
    streamListImg: {
      marginLeft: 25,
    },
    streamListName: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 25,
    },
    test: {
      display: 'flex',
      width: '100%',
      '&:hover': {
        transform: 'scale(1.12)',
        transaction: '4s all',
        transition: 'all 0.4s ease-out',
      },
    },
  }),
);

export {useStyles};
