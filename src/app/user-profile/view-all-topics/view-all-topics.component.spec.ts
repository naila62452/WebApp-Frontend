import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTopicsComponent } from './view-all-topics.component';

describe('ViewAllTopicsComponent', () => {
  let component: ViewAllTopicsComponent;
  let fixture: ComponentFixture<ViewAllTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
