import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTopCastComponent } from './title-top-cast.component';

describe('TitleTopCastComponent', () => {
  let component: TitleTopCastComponent;
  let fixture: ComponentFixture<TitleTopCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleTopCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleTopCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
