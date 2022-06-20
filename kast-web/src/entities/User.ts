export default interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  position: string;
  telephone: string;
  dateOfBirth: Date | null;
  avatarUrl: string;
  tags: string[];
  skills: string[];
  mission: string[];
  vision: string[];
  interests: string[];
  referralCode: string;
  referrer: User | undefined;
  logoUrl: string | undefined;
  backgroundUrl: string | undefined;
  resumeUrl: string | undefined;
}
