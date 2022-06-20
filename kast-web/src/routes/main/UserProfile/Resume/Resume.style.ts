import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: 'flex',
      // justifyContent: 'space-around',
      margin: 'auto',
      textAlign: 'center',
      background: '#FDFCFE',
      marginTop: 20,
    },
    media: {
      width: '100%',
      height: '100%',
      maxWidth: 400,
      maxHeight: 300,
      marginTop: 40,
    },
    mediaContainer: {
      width: 400,
      height: 300,
      margin: 'auto',
    },
    textContainer: {
      border: 'solid 1px #C82FC6',
      maxWidth: 950,
      margin: 'auto',
      marginTop: 80,
      paddingTop: 10,
      paddingRight: 50,
      paddingBottom: 10,
      paddingLeft: 50,
    },
    text: {
      fontWeight: 500,
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginTop: 80,
    },

    fieldContainer: {
      flex: 1,
    },
    field: {
      width: '96%',
      background: '#F5F6F8',
      border: '1px solid #E3E3E3',
      padding: 20,
      fontWeight: 500,
      fontSize: 18,
    },
    label: {marginTop: 15},
    topField: {
      background: '#F5F6F8',
    },
    bottomField: {
      background: '#F5F6F8',
      border: '1px solid #E3E3E3',
      boxSizing: 'border-box',
      borderRadius: 4,
    },
  }),
);

export {useStyles};
