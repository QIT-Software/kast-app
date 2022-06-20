export default class UserUpdateRequest {
    constructor(name: string | undefined, email: string | undefined, country: string | undefined, city: string | undefined, position: string | undefined, telephone: string | undefined, dateOfBirth: Date | undefined, tags: string[] | undefined, skills: string[] | undefined, mission: string[] | undefined, vision: string[] | undefined, interests: string[] | undefined);
    name: string | undefined;
    email: string | undefined;
    country: string | undefined;
    city: string | undefined;
    position: string | undefined;
    telephone: string | undefined;
    dateOfBirth: Date | undefined;
    tags: string[] | undefined;
    skills: string[] | undefined;
    mission: string[] | undefined;
    vision: string[] | undefined;
    interests: string[] | undefined;
    referralCode: string | undefined;
}
