export default interface ISubscriptionsService {
  subscribeToMessage(roomId: string, userId: string): Promise<void>;

  subscribeToRoom(roomId: string, userId: string): Promise<void>;
}
