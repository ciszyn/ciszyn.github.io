import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsTrackerComponent } from './points-tracker.component';

describe('PointsTrackerComponent', () => {
  let component: PointsTrackerComponent;
  let fixture: ComponentFixture<PointsTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
