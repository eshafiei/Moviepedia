import { Component, Input, OnInit } from '@angular/core';
import { Award } from '../../models/award.model';

@Component({
  selector: 'app-title-awards',
  templateUrl: './title-awards.component.html',
  styleUrls: ['./title-awards.component.scss']
})
export class TitleAwardsComponent implements OnInit {
  @Input() titleAwards: Award[];
  constructor() { }

  ngOnInit() {
  }

}
