import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"],
})
export class InfoComponent implements OnInit {
  constructor() {}
  @Output() back = new EventEmitter();

  ngOnInit(): void {}
}
