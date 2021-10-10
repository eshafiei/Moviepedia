import { Component, OnInit, Input } from '@angular/core';
import { OtherNames } from '../../models/other-names.model';

@Component({
  selector: 'app-title-names',
  templateUrl: './title-names.component.html',
  styleUrls: ['./title-names.component.scss']
})
export class TitleNamesComponent implements OnInit {
  @Input() otherNames: OtherNames[];
  constructor() { }

  ngOnInit() {
  }

}
