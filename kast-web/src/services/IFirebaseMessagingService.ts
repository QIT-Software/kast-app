export default interface IFirebaseMessagingService {
  getToken(): Promise<string | null>;
}
