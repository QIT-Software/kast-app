import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      borderStyle: 'solid',
      borderColor: '#CC3CCA',
      borderWidth: '1px',
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '25%',
      flexGrow: 0,
      // minWidth: 300,
      padding: 10,
      [theme.breakpoints.down('sm')]: {
        order: -1,
        marginLeft: 0,
        height: 500,
      },
    },
    container: {
      display: 'flex',
      flex: 1,
    },
    chatRoot: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      position: 'relative',
    },
    chatBox: {width: '100%'},
    taber: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      height: '10%',
      marginBottom: 20,
    },
    tabElementActive: {
      backgroundColor: '#D258D3',
    },
    tabElement: {
      marginTop: 16,
      padding: '3px 15px',
      borderRadius: 16,
      height: 32,
      flex: '1 1 30%',
      '&:hover': {backgroundColor: '#e57be5', cursor: 'pointer', color: '#FFFFFF'},
    },
    tabElementTextActive: {
      color: '#FFFFFF',
    },
    tabElementText: {
      textTransform: 'capitalize',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 18,
    },
    textInput: {
      bottom: 0,
      margin: 25,
      backgroundColor: '#FFFFFF',
      border: '1px solid #FFEDFF',
      boxSizing: 'border-box',
      boxShadow: '0px 0px 4px rgba(72, 104, 255, 0.24)',
      borderRadius: 5,
    },
    deviceIcon: {
      width: 25,
      height: 25,
      marginLeft: 15,
      objectFit: 'cover',
    },
  });
});

export {useStyles};
