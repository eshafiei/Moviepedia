import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSearchInputComponent } from './title-search-input.component';

describe('TitleSearchComponent', () => {
  let component: TitleSearchInputComponent;
  let fixture: ComponentFixture<TitleSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleSearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
