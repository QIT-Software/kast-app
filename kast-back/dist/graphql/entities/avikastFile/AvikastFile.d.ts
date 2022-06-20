import User from '../user/User';
import { AvikastFileType } from 'entities/AvikastFile';
export default class AvikastFile {
    constructor(id: string, name: string, user: User, type: AvikastFileType);
    id: string;
    name: string;
    user: User;
    type: AvikastFileType;
    fileId: string | undefined;
}
