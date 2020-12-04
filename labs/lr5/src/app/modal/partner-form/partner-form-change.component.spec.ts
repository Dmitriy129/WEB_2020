import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFormChangeComponent } from './partner-form-change.component';

describe('PartnerFormChangeComponent', () => {
  let component: PartnerFormChangeComponent;
  let fixture: ComponentFixture<PartnerFormChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerFormChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerFormChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
