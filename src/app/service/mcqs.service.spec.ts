import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MCQSComponent } from '../add-material/mcqs/mcqs.component';

import { McqsService } from './mcqs.service';

describe('McqsService', () => {
  let service: McqsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MCQSComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ McqsService ]
    });
    service = TestBed.inject(McqsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
