import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: 'flex',
      // justifyContent: 'space-around',
      textAlign: 'center',
      background: '#FDFCFE',
      flex: 1,
      width: '75%',
      margin: 'auto',
    },
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
    page: {padding: 60},
    title: {marginTop: '90%'},
    emphasis: {fontFamily: 'Helvetica-Bold', color: '#F22300'},
    breakable: {width: '100%', height: 400, backgroundColor: 'tomato'},
  }),
);

export {useStyles};
