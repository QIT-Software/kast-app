import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      // justifyContent: 'space-between',
      textAlign: 'center',
      background: '#FDFCFE',
    },
    menuContainer: {},
    titleContainer: {padding: 50},
    listContainer: {marginTop: 50},

    content: {height: '75vh', width: '70%'},
  }),
);

export {useStyles};
