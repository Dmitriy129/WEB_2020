import { Component, Input } from "@angular/core";
import { PartnerFormComponent } from "./partner-form.component";

@Component({
  selector: "app-partner-form-change",
  templateUrl: "./partner-form.component.html",
  styleUrls: ["./partner-form.component.css"],
})
export class PartnerFormChangeComponent extends PartnerFormComponent {
  @Input() name: string;
  @Input() money: number;
}
