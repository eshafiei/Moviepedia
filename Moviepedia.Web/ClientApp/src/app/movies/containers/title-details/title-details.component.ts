import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  async loadData(titleId: number) {
    this.titleInfo = await this.titlesService.getTitleById(titleId);
  }
}
