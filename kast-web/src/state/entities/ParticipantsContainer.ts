import Participant from 'entities/Participant';

export default interface ParticipantsContainer {
  participants: Participant[];
  handRaised: boolean;
  isRoomOwner: boolean;
  roomUserId: string;
  muted: boolean;
  inRoom: boolean;
  myParticipant: Participant | undefined;
}
