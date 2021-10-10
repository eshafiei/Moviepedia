import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAwardsComponent } from './title-awards.component';

describe('TitleAwardsComponent', () => {
  let component: TitleAwardsComponent;
  let fixture: ComponentFixture<TitleAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
