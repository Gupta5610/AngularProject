import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';


import {RouterModule,Routes  } from '@angular/router';
import { AppRoutingModule } from "app/app.routing.module";
import { AppComponent } from "app/app.component";


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
