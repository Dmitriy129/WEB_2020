import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperFormChangeComponent } from './paper-form-change.component';

describe('PaperFormChangeComponent', () => {
  let component: PaperFormChangeComponent;
  let fixture: ComponentFixture<PaperFormChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperFormChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperFormChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
