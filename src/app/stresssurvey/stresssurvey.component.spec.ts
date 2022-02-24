import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StresssurveyComponent } from './stresssurvey.component';

describe('StresssurveyComponent', () => {
  let component: StresssurveyComponent;
  let fixture: ComponentFixture<StresssurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StresssurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StresssurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
