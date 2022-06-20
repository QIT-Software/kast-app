import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: 'flex',
      // justifyContent: 'space-around',
      textAlign: 'center',
      background: '#FDFCFE',
      flex: 1,
      width: '60%',
      margin: 'auto',
    },
    fieldContainer: {
      flex: 1,
    },
    field: {
      width: '97%',
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 20,
    },
  }),
);

export {useStyles};
