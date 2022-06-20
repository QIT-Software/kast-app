import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      height: '88%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // minWidth: 300,
    },

    taber: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      height: '10%',
    },
    tabElementActive: {
      backgroundColor: '#D258D3',
    },
    tabElement: {
      width: '27%',
      padding: '3px 0 3px 0',
      borderRadius: 20,
      marginRight: 5,
      '&:hover': {backgroundColor: '#D258D3', cursor: 'pointer'},
    },
    tabElementTextActive: {
      color: '#FFFFFF',
    },
    tabElementText: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 18,
    },
    textInput: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #FFEDFF',
      boxSizing: 'border-box',
      boxShadow: '0px 0px 4px rgba(72, 104, 255, 0.24)',
      borderRadius: 5,
    },
  });
});

export {useStyles};
