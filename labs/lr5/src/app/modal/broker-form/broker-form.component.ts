import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Broker } from "../../classes/Broker";

@Component({
  selector: "app-broker-form",
  templateUrl: "./broker-form.component.html",
  styleUrls: ["./broker-form.component.css"],
})
export class BrokerFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  name: string;
  money: number;

  isBadName: boolean = false;
  isBadMoney: boolean = false;

  @Output() broker = new EventEmitter<Broker>();
  @Output() closeModal = new EventEmitter();

  add(name: string, money: number): void {
    if (
      name === undefined ||
      name === "" ||
      isNaN(parseInt(name, 10)) === false
    ) {
      if (this.isBadName === true) {
        return;
      }

      this.isBadName = true;

      return;
    }

    if (money === undefined || money === null || money < 0) {
      if (this.isBadMoney === true) {
        return;
      }

      this.isBadMoney = true;

      return;
    }

    this.broker.emit(new Broker(name, money));
  }
}
