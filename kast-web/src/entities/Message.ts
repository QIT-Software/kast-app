import User from './User';

export default interface Message {
  id: string;
  sender: User;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
