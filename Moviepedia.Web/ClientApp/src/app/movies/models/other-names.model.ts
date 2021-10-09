import { TitleNameType } from "../enums/title-name-type.enum";

export interface OtherNames {
  id: number;
  titleName: string;
  titleNameLanguage: string;
  titleNameType: TitleNameType;
}
