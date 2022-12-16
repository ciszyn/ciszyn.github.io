import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaViewerComponent } from './strava-viewer.component';

describe('StravaViewerComponent', () => {
  let component: StravaViewerComponent;
  let fixture: ComponentFixture<StravaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StravaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
