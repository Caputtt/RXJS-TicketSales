import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { TabViewModule} from "primeng/tabview";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
// import {AppModule} from "../../app.module";
import {StatisticComponent} from "./statistic/statistic.component";
import {TourLoaderComponent} from "./tour-loader/tour-loader.component";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TicketsModule} from "../tickets/tickets.module";


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    TabViewModule,
    TableModule,
    FormsModule,
    ToastModule,
    // AppModule,
    InputTextModule,
    TicketsModule

  ],
  providers:[
    MessageService
  ]

})
export class SettingsModule { }
