import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleType } from '../../enums/role-type.enum';
import { TitleMainParticipants } from '../../models/title-main-participants.model';
import { TitleParticipant } from '../../models/title-participant.model';
import { Title } from '../../models/title.model';
import { TitleService } from '../../services/titles.service';

@Component({
  selector: 'app-title-details',
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.scss']
})
export class TitleDetailsComponent implements OnInit {
  titleInfo: Title;
  constructor(private route: ActivatedRoute,
    private titlesService: TitleService) { }

  ngOnInit() {
    const titleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(titleId);
  }

  loadData(titleId: number) {
    this.titlesService.getTitleById(titleId)
      .subscribe((titleData: Title) => {
        this.titleInfo = titleData;
        this.setMainParticipants(this.titleInfo.titleParticipants);
        //console.log(this.titleInfo);
      });
  }

  setMainParticipants(participants: TitleParticipant[]) {
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
    this.titleInfo.mainParticipants = mainParticipants;
  }

  removeDuplicates(TitleParticipants: TitleParticipant[]) : TitleParticipant[] {
    const allItems = TitleParticipants;
    let uniqueItems: TitleParticipant[] = [];
    allItems.forEach((p: TitleParticipant) => {
      if (uniqueItems.length === 0) {
        uniqueItems.push(p);
      }
      else if (uniqueItems.find((item) => { item.participant.name.toLowerCase() !== p.participant.name.toLowerCase() } ) ) {
        uniqueItems.push(p);
      }
    });
    return uniqueItems;
  }
}
