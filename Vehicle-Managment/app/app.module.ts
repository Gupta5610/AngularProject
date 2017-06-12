import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { VehicleListComponent } from './vehicles/vehicle-list.component';
import { AddVehicleComponent } from './addvehicle/add-vehicle.component';
import { ShowVehicleComponent} from './views/view.component';

 
const appRoutes: Routes = [
{ path: 'home', component: VehicleListComponent },
{ path: 'add', component: AddVehicleComponent },
{ path: 'view/:index', component: ShowVehicleComponent},

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

// { path: 'viewRequest', component: View },

]; 
 


@NgModule({
  imports: [ BrowserModule ,
             FormsModule,
             RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent , VehicleListComponent, AddVehicleComponent, ShowVehicleComponent],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
