import { Component, OnInit } from "@angular/core";
import { Broker } from "../classes/Broker";
import { BrokerService } from "../services/broker.service";

@Component({
  selector: "app-brokers",
  templateUrl: "./broker.component.html",
  styleUrls: ["./broker.component.css"],
})
export class BrokerComponent implements OnInit {
  addModalOpened: boolean = false;
  changeModalOpened: boolean = false;
  changeBrokerName: string;
  infoModalOpened: boolean = false;
  brokers: Broker[];
  changeValue: Broker = new Broker("", 0);

  constructor(private brokerService: BrokerService) {}

  ngOnInit(): void {
    this.brokers = this.brokerService.getData();
  }

  add(): void {
    this.addModalOpened = true;
  }

  newBrokerEvent(value: Broker): void {
    if (this.brokerService.find(value.name)) {
      this.infoModalOpened = true;
      return;
    }

    this.addModalOpened = false;
    this.brokerService.addData(value.name, value.money);
  }

  deleteBroker(event): void {
    const name = event.closest("div").firstChild.lastElementChild.innerHTML;
    this.brokerService.deleteData(name);
  }

  changeBroker(event): void {
    debugger;
    const div = event.closest("div");
    this.changeValue.name = div.children[0].lastElementChild.innerHTML;
    this.changeValue.money = div.children[1].lastElementChild.innerHTML;
    this.changeModalOpened = true;
    this.changeBrokerName = div.firstChild.lastElementChild.innerHTML;
  }

  changeBrokerEvent(value: Broker): void {
    this.changeModalOpened = false;
    this.brokerService.change(this.changeBrokerName, value.name, value.money);
  }
}
