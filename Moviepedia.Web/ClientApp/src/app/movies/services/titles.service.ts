import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Title } from '../models/title.model';
import { RoleType } from '../enums/role-type.enum';
import { TitleMainParticipants } from '../models/title-main-participants.model';
import { TitleParticipant } from '../models/title-participant.model';
import { OtherNames } from '../models/other-names.model';
import { TitleNameType } from '../enums/title-name-type.enum';
import { Award } from '../models/award.model';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private http: HttpClient) {}

  async getAllTitles(): Promise<any>{
    const baseUrl = environment.baseUrl;
    const allTitles = await this.http.get(baseUrl + '/movies/getAllTitles').toPromise();
    return allTitles;
  }

  async getTitleById(titleId: number): Promise<Title> {
    const baseUrl = environment.baseUrl;
    let titleInfo: Title = await this.http.get(baseUrl + '/movies/getTitleById/' + titleId).toPromise();
    titleInfo.mainParticipants = this.setMainParticipants(titleInfo.titleParticipants);
    titleInfo.otherNames = this.filterOtherNames(titleInfo.otherNames);
    titleInfo.awards = this.sortAwards(titleInfo.awards);
    return titleInfo;
  }

  setMainParticipants(participants: TitleParticipant[]) : TitleMainParticipants {
    const directors = participants.filter(p => p.roleType.trim().toLowerCase() === RoleType.Director);
    const producers = participants.filter(p => p.roleType.trim().toLowerCase() === RoleType.Producer);
    const screenPlay = participants.filter(p => p.roleType.trim().toLowerCase() === RoleType.Screenplay);
    const topCast = participants.filter(p => p.isKey === true && p.roleType.trim().toLowerCase() === RoleType.Actor);
    const mainParticipants: TitleMainParticipants = {
      directors: this.removeDuplicates(directors),
      producers: this.removeDuplicates(producers),
      screenPlay: this.removeDuplicates(screenPlay),
      topCast: this.removeDuplicates(topCast)
    };
    return mainParticipants;
  }

  removeDuplicates(TitleParticipants: TitleParticipant[]) : TitleParticipant[] {
    let uniqueItems: TitleParticipant[] = [];
    TitleParticipants.forEach((p: TitleParticipant) => {
      if (uniqueItems.length === 0) {
        uniqueItems.push(p);
      }
      else if (!uniqueItems.find((item) => { item.participant.name.toLowerCase() === p.participant.name.toLowerCase() } ) ) {
        uniqueItems.push(p);
      }
    });
    return uniqueItems;
  }

  filterOtherNames(movieNames: OtherNames[]) : OtherNames[] {
    return movieNames.filter(m => m.titleNameType.toLowerCase() !== TitleNameType.Primary);
  }

  sortAwards(awards: Award[]) {
    return awards.sort((x, y) => {
      return Number(y.awardWon) - Number(x.awardWon);
    });
  }
}
