import IRoomManager from '../../managers/room/IRoomManager';
import { MuteAction, MuteSource, RoomType } from 'entities/Room';
import Room from 'graphql/entities/room/Room';
import Participant from 'graphql/entities/room/Participant';
import ParticipantMedia from 'graphql/entities/room/ParticipantMedia';
import { PubSubEngine } from 'graphql-subscriptions';
import SessionInfo from 'entities/SessionInfo';
export default class RoomResolver {
    private readonly roomManager;
    private readonly pubSub;
    constructor(roomManager: IRoomManager, pubSub: PubSubEngine);
    createRoom(session: SessionInfo, name: string, type: RoomType, passwordProtected: boolean, password: string | undefined): Promise<Room>;
    rooms(): Promise<Room[]>;
    deleteRooms(roomIds: string[]): Promise<Boolean>;
    joinRoom(session: SessionInfo, inviteLink: string, password: string): Promise<Room>;
    roomById(session: SessionInfo, roomId: string): Promise<Room>;
    room(session: SessionInfo): Promise<Room | undefined>;
    userRooms(session: SessionInfo): Promise<Room[]>;
    participantsResolveField(room: Room): Promise<Participant[]>;
    participants(session: SessionInfo, roomId: string): Promise<Participant[]>;
    participantsTracks(session: SessionInfo, roomId: string): Promise<ParticipantMedia[]>;
    webinarOwner(session: SessionInfo, roomId: string): Promise<Participant>;
    inviteLinkByRoomById(roomId: string): Promise<string>;
    raiseHand(session: SessionInfo, roomId: string, raiseHand: boolean): Promise<boolean>;
    leaveRoom(roomId: string, session: SessionInfo): Promise<boolean>;
    closeRoom(roomId: string): Promise<boolean>;
    private roomUpdatedSubscription;
    roomSub(_roomId: string): Promise<AsyncIterator<unknown, any, undefined>>;
    mute(session: SessionInfo, action: MuteAction, source: MuteSource, userId: string, roomId: string, producerId: string): Promise<boolean>;
    muteAll(session: SessionInfo, action: MuteAction, userId: string, roomId: string): Promise<boolean>;
    kick(session: SessionInfo, userId: string, roomId: string): Promise<boolean>;
}
