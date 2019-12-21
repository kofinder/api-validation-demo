import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// COMPONENTS
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { AppHttpInterceptor } from './app.inteceptor';

/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
