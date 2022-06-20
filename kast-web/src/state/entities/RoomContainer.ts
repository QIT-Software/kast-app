import Room, {RoomType, UserRole, ViewModeEnum} from 'entities/Room';

export default interface RoomContainer {
  room: Room | undefined;
  roomType: RoomType | undefined;
  userRole: UserRole;
  viewMode: ViewModeEnum;
}
