import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialMindfulComponent } from './initial-mindful.component';

describe('InitialMindfulComponent', () => {
  let component: InitialMindfulComponent;
  let fixture: ComponentFixture<InitialMindfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialMindfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialMindfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
