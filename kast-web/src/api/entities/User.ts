export default interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  position: string;
  telephone: string;
  dateOfBirth: Date;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  mission: string[];
  vision: string[];
  interests: string[];
  referralCode: string;
  referrer: User;
  logoUrl: string;
  backgroundUrl: string;
  resumeUrl: string;
}
