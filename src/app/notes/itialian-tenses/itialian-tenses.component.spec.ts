import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItialianTensesComponent } from './itialian-tenses.component';

describe('ItialianTensesComponent', () => {
  let component: ItialianTensesComponent;
  let fixture: ComponentFixture<ItialianTensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItialianTensesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItialianTensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
