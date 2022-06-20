import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 30,
    },
    paperRoot: {
      marginTop: '10%',
      marginRight: '10%',
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      height: 300,
      width: 400,
      marginTop: 50,
    },
    filesWrapper: {
      marginLeft: 20,
      marginRight: 70,
      color: '#C82FC6',
      maxWidth: 1100,
      flexDirection: 'column',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
        marginLeft: 0,
        marginRight: 0,
      },
    },
    formControl: {
      minWidth: 500,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 60,
    },
    selectInput: {
      width: 140,
      marginRight: 100,
      height: 17,
    },
    selectSubInput: {
      minWidth: 210,
      color: '#C82FC6',
      height: 17,
    },
    filesAndFoldersSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
    head: {
      width: '100%',
      color: '#C82FC6',
      textAlign: 'start',
      borderBottom: '1px solid #FFCCFE',
      marginBottom: 47,
    },
    filesContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: 920,
      flexWrap: 'wrap',
      marginBottom: 34,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    fileButtonWrapper: {
      width: '45%',
      minWidth: 240,
      [theme.breakpoints.down('sm')]: {
        // flexWrap: 'nowrap',
        width: '100%',
      },
    },
    fileButton: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px',
      height: 60,
      textAlign: 'center',
      marginRight: 15,
      marginBottom: 20,
      border: '2px solid #FFCCFE',
      borderRadius: 5,
      padding: '5%',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        marginBottom: 10,
      },
    },

    fileName: {
      fontSize: 13,
      overFlow: 'hidden',
    },
    icon: {
      marginRight: 10,
    },
    filesUploadContainer: {
      border: '2px solid #FFCCFE',
      borderRadius: 5,
      margin: 10,
    },
    replyIcon: {
      width: 10,
      height: 10,
    },
  }),
);

export {useStyles};
