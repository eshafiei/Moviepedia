import { Participant } from "./participant.model";

export interface TitleParticipant {
  id: number;
  isKey: boolean;
  isOnScreen: boolean;
  participant: Participant;
  participantId: number;
  roleType: string;
  titleId: number;
}
