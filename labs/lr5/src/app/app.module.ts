import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
// import { PartnersComponent } from "./components/partners.component";
// import { PapersComponent } from "./components/papers.component";
// import { SettingsComponent } from "./components/settings_/settings.component";
// import { PartnerModalComponent } from "./components/modals/partner.modal.component";
// import { PaperModalComponent } from "./components/modals/paper.modal.component";
// import { ChangePartnerModalComponent } from "./components/modals/change.partner.modal.component";
// import { ChangePaperModalComponent } from "./components/modals/change.paper.modal.component";
import { SettingsComponent } from "./settings/settings.component";
import { PartnersComponent } from "./partners/partners.component";
import { InfoComponent } from "./info/info.component";
import { PaperComponent } from "./paper/paper.component";
import { PaperFormComponent } from "./modal/paper-form/paper-form.component";
import { PartnerFormComponent } from "./modal/partner-form/partner-form.component";
import { PaperFormChangeComponent } from "./modal/paper-form/paper-form-change.component";
import { PartnerFormChangeComponent } from "./modal/partner-form/partner-form-change.component";

@NgModule({
  declarations: [
    AppComponent,
    // PapersComponent,
    // PartnerModalComponent,
    // PaperModalComponent,
    // ChangePartnerModalComponent,
    // ChangePaperModalComponent,
    SettingsComponent,
    PartnersComponent,
    InfoComponent,
    PaperComponent,
    PaperFormComponent,
    PartnerFormComponent,
    PaperFormChangeComponent,
    PartnerFormChangeComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
