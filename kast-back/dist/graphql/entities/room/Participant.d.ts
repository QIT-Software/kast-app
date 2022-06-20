import { ParticipantRole } from 'entities/Participant';
import User from '../user/User';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
export default class Participant {
    constructor(id: string, user: User, role: ParticipantRole, media: ParticipantMedia, raiseHand: boolean | undefined, kicked: boolean, muted: boolean);
    id: string;
    user: User;
    role: ParticipantRole;
    media: ParticipantMedia;
    raiseHand: boolean | undefined;
    kicked: boolean;
    muted: boolean;
}
