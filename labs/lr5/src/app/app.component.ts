import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PartnerService } from "./services/partner.service";
import { PaperService } from "./services/paper.service";
import { SettingsComponent } from "./settings/settings.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [PartnerService, PaperService],
})
export class AppComponent {
  infoModalOpened: boolean = false;
  messageInfo: string;

  finishText: string = "finish text";

  @ViewChild(SettingsComponent, { static: false }) viewChild: SettingsComponent;

  constructor(
    private partnerService: PartnerService,
    private paperService: PaperService,
    private http: HttpClient
  ) {}

  submitAll(): void {
    if (this.partnerService.length() === 0) {
      this.messageInfo = "Нет ни одного участника!";
      this.infoModalOpened = true;
      return;
    }
    if (this.paperService.length() === 0) {
      this.messageInfo = "Нет ни одной акции!";
      this.infoModalOpened = true;
      return;
    }
    if (
      // @ts-ignore
      this.viewChild.result.start === "" ||
      // @ts-ignore
      this.viewChild.result.end === "" ||
      // @ts-ignore
      this.viewChild.result.interval === ""
    ) {
      this.messageInfo = "Заданы не все настройки!";
      this.infoModalOpened = true;
      return;
    }
    this.req();
  }

  req(): void {
    this.http
      .post("http://localhost:3000/print", {
        partners: this.partnerService.getData(),
        papers: this.paperService.getData(),
        settings: this.viewChild.result,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.messageInfo = "Конфигурация сохранена в JSON файл!";
          this.infoModalOpened = true;
        },
        (err) => {
          console.log(err);
          this.messageInfo = "Тут траблы, сломалось что-то";
          this.infoModalOpened = true;
        }
      );
  }
}
