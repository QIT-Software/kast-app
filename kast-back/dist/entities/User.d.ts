import { ID } from './Common';
export default class User {
    constructor(id: ID, name: string, email: string, country: string, city: string, position: string, telephone: string, dateOfBirth: Date | null, avatarUrl: string, tags: string[], skills: string[], mission: string[], vision: string[], interests: string[], referralCode: string, referrer: User | undefined, banUntilDate: Date | undefined, banForever: boolean | undefined, logoUrl: string | undefined, backgroundUrl: string | undefined, resumeUrl: string | undefined);
    id: ID;
    name: string;
    email: string;
    country: string;
    city: string;
    position: string;
    telephone: string;
    dateOfBirth: Date | null;
    avatarUrl: string;
    tags: string[];
    mission: string[];
    vision: string[];
    interests: string[];
    skills: string[];
    referralCode: string;
    referrer: User | undefined;
    banUntilDate: Date | undefined;
    banForever: boolean | undefined;
    logoUrl: string | undefined;
    backgroundUrl: string | undefined;
    resumeUrl: string | undefined;
}
