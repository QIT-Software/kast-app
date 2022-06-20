import User from 'entities/User';

export default interface Client {
  id: string;
  user: User;
}
