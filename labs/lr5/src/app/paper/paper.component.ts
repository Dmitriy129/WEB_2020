import { Component, OnInit } from "@angular/core";
import { PaperService } from "../services/paper.service";
import { Paper } from "../classes/Paper";

@Component({
  selector: "app-paper",
  templateUrl: "./paper.component.html",
  styleUrls: ["./paper.component.css"],
})
export class PaperComponent implements OnInit {
  addModalOpened: boolean = false;
  changeModalOpened: boolean = false;
  changePaperName: string;
  infoModalOpened: boolean = false;
  papers: Paper[];
  changeValue: Paper = new Paper("", "", 0, 0, 0);

  constructor(private paperService: PaperService) {}

  ngOnInit(): void {
    this.papers = this.paperService.getData();
  }

  add(): void {
    this.addModalOpened = true;
  }

  newPaperEvent(value: Paper): void {
    if (this.paperService.find(value.name)) {
      this.infoModalOpened = true;
      return;
    }
    this.addModalOpened = false;
    this.paperService.addData(
      value.name,
      value.rule,
      value.max,
      value.count,
      value.startPrice
    );
  }

  deletePaper(event): void {
    const deleteValue = event.closest("div").firstChild.lastElementChild
      .innerHTML;

    this.paperService.deleteData(deleteValue);
  }

  changePaper(event): void {
    const div = event.closest("div");
    this.changeValue.name = div.children[0].lastElementChild.innerHTML;
    this.changeValue.rule = div.children[1].lastElementChild.innerHTML;
    this.changeValue.max = div.children[2].lastElementChild.innerHTML;
    this.changeValue.count = div.children[3].lastElementChild.innerHTML;
    this.changeValue.startPrice = div.children[4].lastElementChild.innerHTML;
    this.changePaperName = div.firstChild.lastElementChild.innerHTML;
    this.changeModalOpened = true;
  }

  changePaperEvent(value: Paper): void {
    this.changeModalOpened = false;
    this.paperService.change(
      this.changePaperName,
      value.name,
      value.rule,
      value.max,
      value.count,
      value.startPrice
    );
  }
}
