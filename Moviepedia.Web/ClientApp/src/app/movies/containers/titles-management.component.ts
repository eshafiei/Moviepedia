import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Title } from '../models/title.model';
import { TitleService } from '../services/titles.service';

@Component({
  selector: 'app-titles-management',
  templateUrl: './titles-management.component.html',
  styleUrls: ['./titles-management.component.scss']
})
export class TitlesManagementComponent implements OnInit {
  titlesInfo: Title[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isExpanded: boolean;
  dataSource: any;
  displayedColumns: string[] = [
    'titleName',
    'releaseYear'
  ];

  constructor(private titlesService: TitleService) { }

  ngOnInit() {
    this.isExpanded = true;
    this.loadData();
  }

  loadData() {
    this.titlesService.getAllTitles()
      .subscribe((titlesData: Title[]) => {
        this.titlesInfo = titlesData;
        this.dataSource = new MatTableDataSource(this.titlesInfo);
        this.dataSource.paginator = this.paginator;
      });
  }
}
