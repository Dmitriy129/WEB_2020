import { Component, OnInit, Input } from "@angular/core";
import { PaperFormComponent } from "./paper-form.component";
@Component({
  selector: "app-paper-form-change",
  templateUrl: "./paper-form.component.html",
  styleUrls: ["./paper-form.component.css"],
})
export class PaperFormChangeComponent extends PaperFormComponent {
  @Input() name: string;
  @Input() rule: string;
  @Input() max: number;
  @Input() count: number;
  @Input() startPrice: number;
}
