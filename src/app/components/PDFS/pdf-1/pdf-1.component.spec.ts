import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf1Component } from './pdf-1.component';

describe('Pdf1Component', () => {
  let component: Pdf1Component;
  let fixture: ComponentFixture<Pdf1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pdf1Component]
    });
    fixture = TestBed.createComponent(Pdf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
