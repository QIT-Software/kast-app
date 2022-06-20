import User from '../user/User';
export default class Message {
    constructor(id: string, sender: User, roomId: string, body: string, date: Date, receiverId: string | undefined);
    id: string;
    sender: User;
    roomId: string;
    body: string;
    date: Date;
    receiverId: string | undefined;
}
