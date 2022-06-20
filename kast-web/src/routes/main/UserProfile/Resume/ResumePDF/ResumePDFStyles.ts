import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center',
      background: '#FDFCFE',
      margin: 'auto',
      marginLeft: 100,
    },
    content: {},
    fieldContainer: {
      flex: 1,
    },
    field: {
      width: '100%',
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
    media: {
      width: '100%',
      height: '100%',
      maxWidth: 400,
      maxHeight: 300,
      marginTop: 40,
      marginBottom: 50,
    },
    mediaContainer: {
      width: 400,
      height: 600,
      margin: 'auto',
    },
    buttonContainer: {
      width: 325,
      margin: 'auto',
    },
  }),
);

export {useStyles};
