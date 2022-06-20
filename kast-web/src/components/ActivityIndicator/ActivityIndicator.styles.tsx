import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
      background: '#FDFCFE',
    },
  }),
);

export {useStyles};
