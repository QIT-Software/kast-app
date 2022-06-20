import React, {useEffect, useState} from 'react';
import {useStyles} from 'routes/main/Room/RoomMenu/RoomMenu.styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {useSelector} from 'state/hooks';
import {useChatActions} from 'state/hooks/UseActions';
import {RequireLoadable} from 'components';
import {useParams} from 'react-router-dom';
import {SubscriptionService} from 'services';
import MessageContainer from './MessageContainer/MessageContainer';
import {useTranslation} from 'react-i18next';

const ChatTab: React.FC = () => {
  const {t} = useTranslation('room');
  const classes = useStyles();
  const state = useSelector((state) => state.chat);
  const {roomId} = useParams<{roomId: string}>();
  const actions = useChatActions();
  const [messageBody, setMessageBody] = useState<string>('');
  useEffect(() => {
    actions.fetchMessages(roomId);
    SubscriptionService.subscribeToMessage(roomId, '5ef49007fdaeb065376f75a0');
  }, []);

  const handleChangeMessage = (event: any) => {
    setMessageBody(event.target.value);
  };

  const handleCreateMessage = (event: any) => {
    if (event.keyCode === 13) {
      actions.createMessage({
        roomId,
        messageBody,
      });
      setMessageBody('');
    }
  };

  const handleChange = (userName: string) => {
    setMessageBody(`@${userName} `);
  };

  const renderChat = () => {
    return (
      <RequireLoadable data={state}>
        {({data}) => {
          return (
            <Box className={classes.chatRoot}>
              <MessageContainer data={data} roomId={roomId} handleChange={handleChange} />
              <TextField
                className={classes.textInput}
                id="outlined-basic"
                variant="outlined"
                placeholder={t('chatPlaceholder')}
                value={messageBody}
                autoComplete="off"
                onChange={handleChangeMessage}
                onKeyDown={handleCreateMessage}
              />
            </Box>
          );
        }}
      </RequireLoadable>
    );
  };

  return (
    <Box borderColor="primary" className={classes.chatBox}>
      {renderChat()}
    </Box>
  );
};

export default ChatTab;
