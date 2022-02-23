import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtEventsComponent } from './eidt-events.component';

describe('EidtEventsComponent', () => {
  let component: EidtEventsComponent;
  let fixture: ComponentFixture<EidtEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EidtEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EidtEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
