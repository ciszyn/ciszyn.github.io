import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaLoginComponent } from './strava-login.component';

describe('StravaLoginComponent', () => {
  let component: StravaLoginComponent;
  let fixture: ComponentFixture<StravaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StravaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
