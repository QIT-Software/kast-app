import User from './User';
export declare enum RoomType {
    Meeting = "Meeting",
    Webinar = "Webinar"
}
export default interface Room {
    id: string;
    closed: undefined | Date;
    name: string;
    inviteLink: string;
    type: RoomType;
    user: User;
}
export declare enum MuteAction {
    Mute = "Mute",
    UnMute = "unMute"
}
export declare enum MuteSource {
    Audio = "Audio",
    Video = "Video",
    Screen = "Screen"
}
