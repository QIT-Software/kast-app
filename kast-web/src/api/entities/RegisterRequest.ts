export default interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  referralCode: string | undefined;
}
