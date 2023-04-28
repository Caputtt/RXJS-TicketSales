import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component'
import { InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import { TestComponent } from './test/test.component';
import {CheckboxModule} from 'primeng/checkbox';
import { RegistrationComponent } from './registration/registration.component';
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,
    TestComponent,
    RegistrationComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AuthModule { }
