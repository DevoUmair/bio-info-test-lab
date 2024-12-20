import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnlaysisPatientComponent } from './anlaysis-patient.component';

describe('AnlaysisPatientComponent', () => {
  let component: AnlaysisPatientComponent;
  let fixture: ComponentFixture<AnlaysisPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnlaysisPatientComponent]
    });
    fixture = TestBed.createComponent(AnlaysisPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
