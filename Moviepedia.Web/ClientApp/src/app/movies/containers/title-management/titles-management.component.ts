import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChoiceModel } from 'src/app/common/models/choice-item.model';
import { Title } from '../../models/title.model';
import { TitleService } from '../../services/titles.service';

@Component({
  selector: 'app-titles-management',
  templateUrl: './titles-management.component.html',
  styleUrls: ['./titles-management.component.scss']
})
export class TitlesManagementComponent implements OnInit {
  titlesInfo: Title[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  isExpanded: boolean;
  dataSource: MatTableDataSource<Title> = new MatTableDataSource<Title>();
  displayedColumns: string[] = [
    'titleName',
    'releaseYear'
  ];

  constructor(private titlesService: TitleService,
    private router: Router) { }
  titleSearchAutoComplete = new FormControl();
  filteredTitleOptions: Observable<ChoiceModel<number>[]>;
  titleOptions: ChoiceModel<number>[] = [];
  yearOptions: ChoiceModel<number>[] = [];

  ngOnInit() {
    this.isExpanded = true;
    this.loadData();

    this.filteredTitleOptions = this.titleSearchAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(name => name ? this.filterTitlesDropDown(name) : this.titleOptions.slice())
      );
  }

  async loadData() {
    this.titlesInfo = await this.titlesService.getAllTitles();
    this.dataSource = new MatTableDataSource(this.titlesInfo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
    this.dataSource.sort = this.sort;

    this.titlesInfo.forEach((item) => {
      const titleOption: ChoiceModel<number> = {
        description: `${item.titleName} (${item.releaseYear})`,
        value: item.titleId
      };
      this.titleOptions.push(titleOption);
    });
  }

  displayFn(title: ChoiceModel<number>): string {
    return title && title.description ? title.description : '';
  }

  private filterTitlesDropDown(titleName: string): ChoiceModel<number>[] {
    const filterValue = titleName.toLowerCase();
    this.dataSource.filter = titleName.toLowerCase();
    const filteredOptions = this.titleOptions.filter(option => option.description.toLowerCase().includes(filterValue));
    return filteredOptions;
  }

  filterGridData = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onTitleSelected(titleOption: ChoiceModel<number>) {
    if (titleOption.value) {
      const filteredTitles = this.titlesInfo.filter(t => t.titleId === titleOption.value);
      this.dataSource = new MatTableDataSource(filteredTitles);
      this.dataSource.paginator = this.paginator;
      this.router.navigate(['/movie', titleOption.value]);
    }
  }
}
