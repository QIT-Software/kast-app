import React from 'react';
import {Message} from 'state/entities/Chat';
import {useStyles} from './Message.styles';
import userAvatar from 'routes/main/Room/assets/others/user-avatar.png';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import dots from 'routes/main/Room/assets/others/dots.svg';
import {useSelector} from 'state/hooks';
import copyToClipboard from 'routes/main/Room/assets/others/copy_to_clipboard.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useBookmarksActions, useRouterActions} from 'state/hooks/UseActions';
import {useTranslation} from 'react-i18next';

interface IMessage {
  messageData: Message;
  roomId: string;
  handleChange: (userName: string) => void;
}

const MessageElement: React.FC<IMessage> = ({messageData, roomId, handleChange}) => {
  const {t} = useTranslation('room');
  const bookmarkActions = useBookmarksActions();
  const routerActions = useRouterActions();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleChange(messageData.sender.name);
    setAnchorEl(null);
  };
  const roomOwner = useSelector((state) => state.participants.isRoomOwner);

  const renderMessage = () => {
    const replyChar = messageData.body.charAt(0);
    if (replyChar === '@') {
      const messageArr = messageData.body.split(' ');
      const replyUserName = messageArr.splice(0, 1);
      return (
        <div className={classes.messageBodyContainer}>
          <span
            className={classes.messageBodyText}
            style={{color: '#FE704B', marginRight: 10}}
          >
            {replyUserName}
          </span>
          <span className={classes.messageBodyText}>{messageArr.join(' ')}</span>
        </div>
      );
    }
    return <span className={classes.messageBodyText}>{messageData.body}</span>;
  };
  return (
    <div className={classes.container}>
      <div className={classes.headerBlock}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className={classes.senderInfo}
          onClick={() => routerActions.navigateToUser(messageData.sender.id)}
        >
          <img src={userAvatar} alt="" className={classes.senderIcon} />
          <span
            className={classes.senderName}
            style={roomOwner ? {color: 'blue'} : {color: 'black'}}
          >
            {messageData.sender.name}
          </span>
        </div>
        <div className={classes.timeText}>{messageData.date}</div>
        <CopyToClipboard text={messageData.body}>
          <IconButton>
            <img src={copyToClipboard} alt="" />
          </IconButton>
        </CopyToClipboard>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img src={dots} alt="" className={classes.replyIcon} />
        </IconButton>
      </div>
      {renderMessage()}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <span>{t('reply')}</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            bookmarkActions.addBookmark(messageData.body, roomId);
            handleClose();
          }}
        >
          <span>{t('addToBookmark')}</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MessageElement;
