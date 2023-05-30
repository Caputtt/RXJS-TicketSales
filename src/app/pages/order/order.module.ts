import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from "./order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {TicketsModule} from "../tickets/tickets.module";
import {MessageService} from "primeng/api";



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
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
export class OrderModule { }
