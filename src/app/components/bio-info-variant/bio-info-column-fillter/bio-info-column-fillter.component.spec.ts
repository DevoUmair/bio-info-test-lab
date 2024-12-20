import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioInfoColumnFillterComponent } from './bio-info-column-fillter.component';

describe('BioInfoColumnFillterComponent', () => {
  let component: BioInfoColumnFillterComponent;
  let fixture: ComponentFixture<BioInfoColumnFillterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioInfoColumnFillterComponent]
    });
    fixture = TestBed.createComponent(BioInfoColumnFillterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
