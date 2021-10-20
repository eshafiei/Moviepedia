import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChoiceModel } from 'src/app/common/models/choice-item.model';

@Component({
  selector: 'app-title-search-input',
  templateUrl: './title-search-input.component.html',
  styleUrls: ['./title-search-input.component.scss']
})
export class TitleSearchInputComponent implements OnInit {
  titleSearchAutoComplete = new FormControl();
  filteredTitleOptions: Observable<ChoiceModel<number>[]>;
  @Input() titleOptions: ChoiceModel<number>[] = [];
  @Output() keyup = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit() {
    this.filteredTitleOptions = this.titleSearchAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(name => name ? this.filterTitlesDropDown(name) : this.titleOptions.slice())
      );
  }

  displayFn(title: ChoiceModel<number>): string {
    return title && title.description ? title.description : '';
  }

  private filterTitlesDropDown(titleName: string): ChoiceModel<number>[] {
    const filterValue = titleName.toLowerCase();
    const filteredOptions = this.titleOptions.filter(option => option.description.toLowerCase().includes(filterValue));
    return filteredOptions;
  }

  filterData = (value: string) => {
    this.keyup.emit(value.toString().trim().toLowerCase());
  }

  onTitleSelected(titleOption: ChoiceModel<number>) {
    if (titleOption.value) {
      this.router.navigate(['/movie', titleOption.value]);
    }
  }
}
