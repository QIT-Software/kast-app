import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    messageContainer: {
      overflow: 'auto',
      width: '100%',
      height: '100%',
      maxHeight: '65vh',
      '&::-webkit-scrollbar': {width: 0},
    },
  }),
);
