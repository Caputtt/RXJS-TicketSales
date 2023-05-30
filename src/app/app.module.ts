import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInterceptorsService} from "./services/interceptors/restInterceptors";
import {TabViewModule} from "primeng/tabview";
import {ConfigService} from "./services/configService/config.service";

function initializeApp(config: ConfigService) {
    return () => config.loadPromise().then(() => {
      console.log('---CONFIG LOADED--', ConfigService.config)
    });
  }


@NgModule({
    declarations: [
        AppComponent,
          ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        TabViewModule,
    ],
    providers: [
        AuthService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [ConfigService], multi: true,
        },
        {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},
    ],
  exports: [


  ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
