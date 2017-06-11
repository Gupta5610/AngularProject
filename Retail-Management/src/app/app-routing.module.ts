import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { AdminComponent } from "app/admin/admin.component";
import { AddComponent } from "app/admin/add/add.component";
import { EditComponent } from "app/admin/edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component : LoginComponent
  },
  {
    path : 'addForm',
    component : AddComponent
  },
  {
    path : 'editform',
    component : EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
