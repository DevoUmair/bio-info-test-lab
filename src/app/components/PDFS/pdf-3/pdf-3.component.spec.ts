import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf3Component } from './pdf-3.component';

describe('Pdf3Component', () => {
  let component: Pdf3Component;
  let fixture: ComponentFixture<Pdf3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pdf3Component]
    });
    fixture = TestBed.createComponent(Pdf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
