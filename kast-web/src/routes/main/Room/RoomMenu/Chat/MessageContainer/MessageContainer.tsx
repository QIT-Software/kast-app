import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {useStyles} from './MessageContainer.styles';
import MessageElement from '../Message/Message';
import {Message} from 'state/entities/Chat';

interface IMessageContainer {
  data: Message[];
  roomId: string;
  handleChange: (userName: string) => void;
}

const MessageContainer: React.FC<IMessageContainer> = ({data, roomId, handleChange}) => {
  const classes = useStyles();
  const chatRef = React.useRef();

  useEffect(() => {
    // @ts-ignore
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    // @ts-ignore
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [data]);

  const renderMessage = (data: Message[]) =>
    data.map((item: Message) => (
      <ListItem style={{flex: 1}}>
        <MessageElement messageData={item} roomId={roomId} handleChange={handleChange} />
      </ListItem>
    ));

  return (
    <div style={{flex: 1, overflowY: 'scroll', maxHeight: '65vh'}}>
      <List innerRef={chatRef} className={classes.messageContainer}>
        {renderMessage(data)}
      </List>
    </div>
  );
};

export default MessageContainer;
