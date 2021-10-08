import { TitleGenre } from "./title-genre.model";

export interface Title {
  titleId: number;
  titleName: string;
  releaseYear: number;
  titleGenres?: TitleGenre[]
}
