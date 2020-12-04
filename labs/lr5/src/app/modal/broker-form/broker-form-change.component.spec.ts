import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BrokerFormChangeComponent } from "./broker-form-change.component";

describe("BrokerFormChangeComponent", () => {
  let component: BrokerFormChangeComponent;
  let fixture: ComponentFixture<BrokerFormChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokerFormChangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerFormChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
