import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";import { SettingsComponent } from "./settings/settings.component";
import { BrokerComponent } from "./broker/broker.component";
import { InfoComponent } from "./info/info.component";
import { PaperComponent } from "./paper/paper.component";
import { PaperFormComponent } from "./modal/paper-form/paper-form.component";
import { BrokerFormComponent } from "./modal/broker-form/broker-form.component";
import { PaperFormChangeComponent } from "./modal/paper-form/paper-form-change.component";
import { BrokerFormChangeComponent } from "./modal/broker-form/broker-form-change.component";

@NgModule({
  declarations: [
    AppComponent,
    // PapersComponent,
    // BrokerModalComponent,
    // PaperModalComponent,
    // ChangeBrokerModalComponent,
    // ChangePaperModalComponent,
    SettingsComponent,
    BrokerComponent,
    InfoComponent,
    PaperComponent,
    PaperFormComponent,
    BrokerFormComponent,
    PaperFormChangeComponent,
    BrokerFormChangeComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
