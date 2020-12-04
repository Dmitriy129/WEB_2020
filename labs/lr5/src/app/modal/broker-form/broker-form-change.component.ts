import { Component, Input } from "@angular/core";
import { BrokerFormComponent } from "./broker-form.component";

@Component({
  selector: "app-broker-form-change",
  templateUrl: "./broker-form.component.html",
  styleUrls: ["./broker-form.component.css"],
})
export class BrokerFormChangeComponent extends BrokerFormComponent {
  @Input() name: string;
  @Input() money: number;
}
