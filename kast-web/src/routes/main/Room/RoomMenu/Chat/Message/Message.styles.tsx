import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 5px 20px 0',
      flex: 1,
    },
    senderIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    messageBodyContainer: {
      marginTop: 10,
      paddingHorizontal: 10,
      display: 'flex',
    },
    messageBodyText: {
      alignSelf: 'flex-start',
      fontSize: 18,
      fontWeight: 400,
    },
    headerBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: `center`,
    },
    senderInfo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
      flex: '1 0 70%',
      cursor: 'pointer',
    },
    senderName: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      color: '#AAAAAA',
    },
    senderNameActive: {
      color: '#4868FF',
    },
    timeText: {
      margin: 0,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 12,
      color: '#AAAAAA',
      // marginLeft: 200,
    },
    dot: {
      width: 3,
      height: 3,
      marginRight: 3,
      borderRadius: 3,
      color: '#4868FF',
    },
    replyIcon: {
      width: 10,
      height: 10,
    },
  }),
);

export {useStyles};
