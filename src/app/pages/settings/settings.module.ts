import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TicketsModule} from "../tickets/tickets.module";


@NgModule({
  declarations: [
    SettingsComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        TabViewModule,
        FormsModule,
        ToastModule,
        TicketsModule

    ],
  providers:[
    MessageService
  ]

})
export class SettingsModule { }
