import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenubarModule} from "primeng/menubar";
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {BlocksStyleDirective} from "../../directive/blocks-style.directive";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
    declarations: [
        TicketsComponent,
        HeaderComponent,
        FooterComponent,
        TicketListComponent,
        AsideComponent,
        BlocksStyleDirective
    ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        MenubarModule,
        FormsModule,
        DropdownModule,
        CalendarModule,
        ToastModule,
        InputTextModule,

    ],
  providers: [MessageService],
})
export class TicketsModule { }
