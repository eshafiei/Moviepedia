import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
        console.log(titleData);
      });
  }
}
