import User from './User';
export declare enum AvikastFileType {
    File = "File",
    Directory = "Directory"
}
export interface AvikastFile {
    id: string;
    name: string;
    type: AvikastFileType;
    user: User;
    fileId: string | undefined;
}
