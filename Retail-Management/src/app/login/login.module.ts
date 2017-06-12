import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
  /**
   *
   */
  constructor() {
    console.log("Login Module loaded ...");    
  }
 }
