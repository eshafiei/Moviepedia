import { Component, Input, OnInit } from '@angular/core';
import { TitleParticipant } from '../../models/title-participant.model';

@Component({
  selector: 'app-title-top-cast',
  templateUrl: './title-top-cast.component.html',
  styleUrls: ['./title-top-cast.component.scss']
})
export class TitleTopCastComponent implements OnInit {
  @Input() topCast: TitleParticipant[];
  constructor() { }

  ngOnInit() {
  }

}
