import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMindfulComponent } from './change-mindful.component';

describe('ChangeMindfulComponent', () => {
  let component: ChangeMindfulComponent;
  let fixture: ComponentFixture<ChangeMindfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMindfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMindfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
