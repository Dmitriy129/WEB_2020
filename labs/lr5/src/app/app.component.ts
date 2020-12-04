import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BrokerService } from "./services/broker.service";
import { PaperService } from "./services/paper.service";
import { SettingsComponent } from "./settings/settings.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [BrokerService, PaperService],
})
export class AppComponent {
  infoModalOpened: boolean = false;
  messageInfo: string;

  finishText: string = "finish text";

  @ViewChild(SettingsComponent, { static: false }) viewChild: SettingsComponent;

  constructor(
    private brokerService: BrokerService,
    private paperService: PaperService,
    private http: HttpClient
  ) {}

  submitAll(): void {
    if (this.brokerService.length() === 0) {
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
    const data: object = {
      brokers: this.brokerService.getData(),
      papers: this.paperService.getData(),
      settings: this.viewChild.result,
    };
    this.download(JSON.stringify(data), "configurtion.json", "json");

    this.http.post("http://localhost:3000/print", data).subscribe(
      (data) => {
        console.log(data);
        this.messageInfo = "Конфигурация сохранена на сервере (и на клиенте) ";
        this.infoModalOpened = true;
      },
      (err) => {
        console.log(err);
        this.messageInfo = "Тут траблы, сломалось что-то";
        this.infoModalOpened = true;
      }
    );
  }
  download(data, filename, type): void {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
