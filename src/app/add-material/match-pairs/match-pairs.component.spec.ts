import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPairsComponent } from './match-pairs.component';

describe('MatchPairsComponent', () => {
  let component: MatchPairsComponent;
  let fixture: ComponentFixture<MatchPairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
