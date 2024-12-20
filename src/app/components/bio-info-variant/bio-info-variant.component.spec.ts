import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioInfoVariantComponent } from './bio-info-variant.component';

describe('BioInfoVariantComponent', () => {
  let component: BioInfoVariantComponent;
  let fixture: ComponentFixture<BioInfoVariantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioInfoVariantComponent]
    });
    fixture = TestBed.createComponent(BioInfoVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
