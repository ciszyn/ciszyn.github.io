import { TestBed } from '@angular/core/testing';

import { RandomNotesService } from './random-notes.service';

describe('RandomNotesService', () => {
  let service: RandomNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
