import User from '../user/User';
export default class Bookmark {
    constructor(id: string, date: Date, topic: string, text: string, user: User);
    id: string;
    date: Date;
    topic: string;
    text: string;
    user: User;
}
