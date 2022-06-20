export default interface UpdateUserRequest {
  name: string | undefined;
  dateOfBirth: Date | undefined;
  country: string | undefined;
  city: string | undefined;
  position: string | undefined;
  telephone: string | undefined;
  tags: string[] | undefined;
  skills: string[] | undefined;
  mission: string[] | undefined;
  vision: string[] | undefined;
  interests: string[] | undefined;
  referralCode: string | undefined;
}
