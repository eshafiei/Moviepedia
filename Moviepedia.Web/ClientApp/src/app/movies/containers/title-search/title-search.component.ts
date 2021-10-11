import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ChoiceModel } from 'src/app/common/models/choice-item.model';
import { Title } from '../../models/title.model';
import { TitleService } from '../../services/titles.service';

@Component({
  selector: 'app-title-search',
  templateUrl: './title-search.component.html',
  styleUrls: ['./title-search.component.scss']
})
export class TitleSearchComponent implements OnInit {
  titleSearchAutoComplete = new FormControl();
  filteredTitleOptions: Observable<ChoiceModel<number>[]>;
  titleOptions: ChoiceModel<number>[] = [];
  titlesInfo: Title[] = [];
  constructor(private router: Router,
    private titlesService: TitleService) { }

  ngOnInit() {
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
    const filteredOptions = this.titleOptions.filter(option => option.description.toLowerCase().includes(filterValue));
    return filteredOptions;
  }

  onTitleSelected(titleOption: ChoiceModel<number>) {
    if (titleOption.value) {
      this.router.navigate(['/movie', titleOption.value]);
    }
  }
}
