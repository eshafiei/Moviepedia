import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesManagementComponent } from './titles-management.component';

describe('MoviesManagementComponent', () => {
  let component: TitlesManagementComponent;
  let fixture: ComponentFixture<TitlesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
