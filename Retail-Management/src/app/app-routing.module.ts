import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { AdminComponent } from "app/admin/admin.component";

const routes: Routes = [
  {
    path: '',
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  /**
   *
   */
  constructor() {
    console.log("Routing Module Loaded ... ")
  }
 }
