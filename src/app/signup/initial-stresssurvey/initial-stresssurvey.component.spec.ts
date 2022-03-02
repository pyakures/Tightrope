import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialStresssurveyComponent } from './initial-stresssurvey.component';

describe('InitialStresssurveyComponent', () => {
  let component: InitialStresssurveyComponent;
  let fixture: ComponentFixture<InitialStresssurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialStresssurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialStresssurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
