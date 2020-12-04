import { Component, OnInit } from "@angular/core";
import { Partner } from "../classes/Partner";
import { PartnerService } from "../services/partner.service";

@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.css"],
})
export class PartnersComponent implements OnInit {
  addModalOpened: boolean = false;
  changeModalOpened: boolean = false;
  changePartnerName: string;
  infoModalOpened: boolean = false;
  partners: Partner[];
  changeValue: Partner = new Partner("", 0);

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.partners = this.partnerService.getData();
  }

  add(): void {
    this.addModalOpened = true;
  }

  newPartnerEvent(value: Partner): void {
    if (this.partnerService.find(value.name)) {
      this.infoModalOpened = true;
      return;
    }

    this.addModalOpened = false;
    this.partnerService.addData(value.name, value.money);
  }

  deletePartner(event): void {
    const name = event.closest("div").firstChild.lastElementChild.innerHTML;
    this.partnerService.deleteData(name);
  }

  changePartner(event): void {
    debugger;
    const div = event.closest("div");
    this.changeValue.name = div.children[0].lastElementChild.innerHTML;
    this.changeValue.money = div.children[1].lastElementChild.innerHTML;
    this.changeModalOpened = true;
    this.changePartnerName = div.firstChild.lastElementChild.innerHTML;
  }

  changePartnerEvent(value: Partner): void {
    this.changeModalOpened = false;
    this.partnerService.change(this.changePartnerName, value.name, value.money);
  }
}
