import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleNamesComponent } from './title-names.component';

describe('TitleNamesComponent', () => {
  let component: TitleNamesComponent;
  let fixture: ComponentFixture<TitleNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
