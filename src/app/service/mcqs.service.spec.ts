import { TestBed } from '@angular/core/testing';

import { McqsService } from './mcqs.service';

describe('McqsService', () => {
  let service: McqsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McqsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
