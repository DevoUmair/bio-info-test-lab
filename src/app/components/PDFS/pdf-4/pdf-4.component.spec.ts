import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf4Component } from './pdf-4.component';

describe('Pdf4Component', () => {
  let component: Pdf4Component;
  let fixture: ComponentFixture<Pdf4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pdf4Component]
    });
    fixture = TestBed.createComponent(Pdf4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
