export default class User {
    constructor(id: string, name: string, email: string, country: string, city: string, position: string, telephone: string, dateOfBirth: Date | null, avatarUrl: string, tags: string[], skills: string[], vision: string[], mission: string[], interests: string[], referralCode: string, banUntilDate: Date | undefined, banForever: boolean | undefined, referrer: User | undefined, logoUrl: string | undefined, backgroundUrl: string | undefined, resumeUrl: string | undefined);
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
    banUntilDate?: Date;
    banForever?: Boolean;
    referrer?: User;
    logoUrl?: string;
    backgroundUrl?: string;
    resumeUrl?: string;
}
