import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    messageContainer: {
      marginTop: '5%',
      overflow: 'auto',
      width: '100%',
      height: '50%',
      '&::-webkit-scrollbar': {width: 0},
    },
  }),
);
