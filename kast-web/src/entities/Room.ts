import Participant from 'entities/Participant';
import User from 'entities/User';

export enum RoomType {
  Meeting = 'Meeting',
  Webinar = 'Webinar',
}

export enum UserRole {
  Owner = 'Owner',
  Participant = 'Participant',
}

export interface CreateRoom {
  title: string;
  passwordProtected: boolean;
  password: string | undefined;
  enableMicrophone: boolean;
  enableCamera: boolean;
  type: RoomType;
  userRole: UserRole;
}

export interface JoinRoom {
  inviteLink: string;
  password: string | undefined;
  enableMicrophone: boolean;
  enableCamera: boolean;
  userRole: UserRole;
}

export default interface Room {
  id: string;
  closed: undefined | null | Date;
  name: string;
  inviteLink: string;
  type: RoomType;
  user: User;
  participants: Participant[];
}

export enum ViewModeEnum {
  EqualScreen = 'equalScreen',
  CameraMain = 'cameraMain',
  ScreenMain = 'screenMain',
}

export enum ViewModeScale {
  oneX = '1x',
  twoX = '2x',
  threeX = '3x',
}
