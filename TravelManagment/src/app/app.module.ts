import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';
import { CustomersComponent } from "app/customers-list/customers-list.component";
import { AddComponent } from "app/add/add.component";
import { CustomerServicesService } from "app/shared/customer-services.service";

const appRoutes: Routes=[
{ path: 'home' ,component: CustomersComponent},
{ path: 'add', component: AddComponent},
{ path: 'update/:mobileNo', component: UpdateComponent},
{ path: 'details/:mobileNo', component: DetailsComponent},
{
path: '',
redirectTo: '/home',
pathMatch: 'full'
},
{
path: '**',
redirectTo: '/home',
pathMatch: 'full',
},

];

@NgModule({
  declarations: [
    AppComponent, CustomersComponent, AddComponent, UpdateComponent, DetailsComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),FormsModule
  ],
  providers: [CustomerServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
