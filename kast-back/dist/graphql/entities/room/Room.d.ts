import { RoomType } from 'entities/Room';
import User from 'graphql/entities/user/User';
export default class Room {
    constructor(id: string, closed: undefined | Date, name: string, inviteLink: string, type: RoomType, user: User);
    id: string;
    closed: undefined | Date;
    name: string;
    inviteLink: string;
    type: RoomType;
    user: User;
}
