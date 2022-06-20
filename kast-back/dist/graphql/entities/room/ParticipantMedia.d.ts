import ParticipantTrackOptions from 'graphql/entities/room/ParticipantTrackOptions';
export default class ParticipantMedia {
    constructor(userName: string, audio: ParticipantTrackOptions, video: ParticipantTrackOptions, screen: ParticipantTrackOptions);
    userName: string;
    audio: ParticipantTrackOptions;
    video: ParticipantTrackOptions;
    screen: ParticipantTrackOptions;
}
