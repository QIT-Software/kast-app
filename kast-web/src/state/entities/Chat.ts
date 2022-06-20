import User from '../../entities/User';

export interface Message {
  id: string;
  roomId: string;
  sender: User;
  body: string;
  receiverId: string | undefined | null;
  date: string;
  isMe: boolean;
}

export interface Chat {
  // roomId: string;
  messages: [Message];
}
