import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatPaginator, MatTableDataSource } from '@angular/material';
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
  @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
  isExpanded: boolean;
  dataSource: any;
  displayedColumns: string[] = [
    'titleName',
    'releaseYear'
  ];

  constructor(private titlesService: TitleService) { }
  titleSearchAutoComplete = new FormControl();
  filteredOptions: Observable<ChoiceModel<number>[]>;
  options: ChoiceModel<number>[] = [];

  ngOnInit() {
    this.isExpanded = true;
    this.loadData();

    this.filteredOptions = this.titleSearchAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(name => name ? this.filter(name) : this.options.slice())
      );
  }

  loadData() {
    this.titlesService.getAllTitles()
      .subscribe((titlesData: Title[]) => {
        this.titlesInfo = titlesData;
        this.dataSource = new MatTableDataSource(this.titlesInfo);
        this.dataSource.paginator = this.paginator;
        titlesData.forEach((item) => {
          const titleOption: ChoiceModel<number> = {
            description: item.titleName,
            value: item.titleId
          };
          this.options.push(titleOption);
        });
      });
  }

  displayFn(title: ChoiceModel<number>): string {
    return title && title.description ? title.description : '';
  }

  private filter(titleName: string): ChoiceModel<number>[] {
    const filterValue = titleName.toLowerCase();
    const filteredOptions = this.options.filter(option => option.description.toLowerCase().includes(filterValue));
    return filteredOptions;
  }

  onTitleSelected(titleOption: ChoiceModel<number>) {
    this.titleSearchAutoComplete.setValue('');
    if (titleOption.value) {
      const filteredTitles = this.titlesInfo.filter(t => t.titleId === titleOption.value);
      this.dataSource = new MatTableDataSource(filteredTitles);
      this.dataSource.paginator = this.paginator;
    }
  }
}
