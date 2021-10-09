import { Award } from "./award.model";
import { StoryLine } from "./story-line.model";
import { TitleGenre } from "./title-genre.model";
import { TitleMainParticipants } from "./title-main-participants.model";
import { TitleParticipant } from "./title-participant.model";

export interface Title {
  titleId: number;
  titleName: string;
  releaseYear: number;
  titleGenres: TitleGenre[];
  storyLines?: StoryLine[];
  awards?: Award[];
  titleParticipants: TitleParticipant[];
  mainParticipants?: TitleMainParticipants;
}
