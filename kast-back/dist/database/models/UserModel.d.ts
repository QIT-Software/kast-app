import { Document } from 'mongoose';
export declare const UserSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface UserModel extends Document {
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
    vision: string[];
    mission: string[];
    interests: string[];
    allowNotifications: boolean;
    referralCode: string;
    referrer: UserModel | string | undefined;
    banUntilDate: Date;
    banForever: boolean;
    logoUrl: string;
    backgroundUrl: string;
    resumeUrl: string;
}
