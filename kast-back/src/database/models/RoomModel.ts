import {Document} from 'mongoose';
import {createSchema} from './Common';
import UserModel, {UserSchema} from './UserModel';
import {RoomType} from 'entities/Room';
import Participant from 'database/entities/Participant';

export const RoomSchema = createSchema('room', {
  name: {type: String, required: true},
  closed: {type: Date},
  type: {type: RoomType, enum: RoomType, required: true},
  user: {type: String, ref: UserSchema.name, required: true},
  passwordProtected: {type: Boolean, required: true},
  password: {type: String},
  inviteLink: {type: String, required: true},
  recordingId: {type: String, required: false},
});

export default interface RoomModel extends Document {
  name: string;
  closed: undefined | Date;
  type: RoomType;
  user: UserModel | string;
  passwordProtected: boolean;
  password: string | undefined;
  inviteLink: string;
  recordingId: string | undefined;
  participants: Participant[];
}

export interface CreateRoomModel {
  name: string;
  closed: undefined | Date;
  type: RoomType;
  user: string;
  passwordProtected: boolean;
  password: string | undefined;
  inviteLink: string;
}

export interface WebinarOptions {
  webinarOwner: string;
  viewMode: ViewModeEnum;
  viewModeScale: ViewModeScale;
}

export enum ViewModeEnum {
  CameraAndScreen = 'CameraAndScreen',
  CameraMain = 'CameraMain',
  ScreenMain = 'ScreenMain',
  None = 'None',
}

export enum ViewModeScale {
  oneX = '1x',
  twoX = '2x',
  threeX = '3x',
}
