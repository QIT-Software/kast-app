import IRoomStore from 'database/stores/room/IRoomStore';
import { Model } from 'mongoose';
import RoomModel from 'database/models/RoomModel';
import { MuteAction, MuteSource, RoomType } from 'entities/Room';
import ParticipantModel from 'database/models/ParticipantModel';
import { ParticipantMedia, ParticipantRole, ParticipantTrackOptions } from 'entities/Participant';
import UserModel from 'database/models/UserModel';
import { Subject } from 'rxjs';
import Room from 'database/entities/Room';
import { PlayingType } from 'entities/Mediasoup';
export default class RoomStore extends IRoomStore {
    private roomModel;
    private participantModel;
    private userModel;
    constructor(roomModel: Model<RoomModel>, participantModel: Model<ParticipantModel>, userModel: Model<UserModel>);
    private readonly populateRoom;
    private readonly populateParticipant;
    createRoom(room: {
        name: string;
        closed: undefined;
        type: RoomType;
        user: {
            id: string;
        };
        passwordProtected: boolean;
        password: string | undefined;
        inviteLink: string;
    }): Promise<Room>;
    findRoomByIdOrThrow(id: string): Promise<Room>;
    findRoomByUser(userId: string): Promise<Room | null>;
    findCodeByRoomId(roomId: string): Promise<RoomModel | null>;
    createParticipant(participant: {
        user: {
            id: string;
        };
        room: {
            id: string;
        };
        role: ParticipantRole;
        media: ParticipantMedia;
    }): Promise<import("../../entities/Participant").default>;
    findRoomByCode(inviteLink: string): Promise<Room | null>;
    findParticipant(roomId: string, userId: string): Promise<import("../../entities/Participant").default | undefined>;
    findRoomAsRoomOwnerByUserId(userId: string): Promise<Room | null>;
    findRoomAsParticipantByUserId(userId: string): Promise<Room | null>;
    getParticipants(roomId: string): Promise<import("../../entities/Participant").default[]>;
    getRooms(): Promise<Room[]>;
    getUserRooms(userId: string): Promise<Room[]>;
    deleteRooms(roomIds: string[]): Promise<void>;
    getParticipantsTracks(roomId: string): Promise<ParticipantMedia[]>;
    getWebinarOwner(userId: string, roomId: string): Promise<import("../../entities/Participant").default>;
    updateEmptyParticipant(roomId: string, clientId: string, userId: string): Promise<void>;
    updateParticipantMedia(type: 'audio' | 'video' | 'screenShare', roomId: string, clientId: string, userId: string, request: ParticipantTrackOptions): Promise<boolean>;
    getInviteLink(roomId: string): Promise<string>;
    updateRaiseHand(roomId: string, userId: string, raiseHand: boolean): Promise<boolean>;
    leaveRoom(roomId: string, userId: string): Promise<boolean>;
    closeRoom(roomId: string): Promise<boolean>;
    createRecordId(roomId: string, recordId: string): Promise<void>;
    private changeStream;
    private roomSubject;
    private watchInternal;
    private onChangeEventReceived;
    watchRoom(): Subject<Room>;
    kick(roomOwnerUserId: string, userId: string, roomId: string): Promise<boolean>;
    mute(action: MuteAction, source: MuteSource, userId: string, roomId: string): Promise<boolean>;
    muteAll(action: MuteAction, userId: string, roomId: string): Promise<boolean>;
    muteAudio(action: MuteAction, source: MuteSource, userId: string, roomId: string): Promise<boolean>;
    muteVideo(action: MuteAction, source: MuteSource, userId: string, roomId: string): Promise<boolean>;
    muteScreen(action: MuteAction, source: MuteSource, userId: string, roomId: string): Promise<boolean>;
    playPauseMedia(media: PlayingType, status: boolean, roomId: string, userId: string): Promise<void>;
}
