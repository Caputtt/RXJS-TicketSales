import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {TicketsModule} from "../tickets/tickets.module";
import {CarouselModule} from "primeng/carousel";


@NgModule({
  declarations: [
    TicketItemComponent
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      InputNumberModule,
      CalendarModule,
      TicketInfoRoutingModule,
      TicketsModule,
      CarouselModule,
      FormsModule,
      ButtonModule,
    ]
})
export class TicketInfoModule { }
