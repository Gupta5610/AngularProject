import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "app/login/login.module";
import { AdminModule } from "app/admin/admin.module";
import { UserModule } from "app/user/user.module";
import { CrudService } from "app/admin/Shared/crud.service";
import { SearchService } from "app/shared/services/search.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  
    BrowserModule,
    LoginModule, 
    AdminModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
