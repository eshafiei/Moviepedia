import { Genre } from "./genre.model";

export interface TitleGenre {
  id: number;
  genreId: number;
  titleId: number;
  genre: Genre;
}
