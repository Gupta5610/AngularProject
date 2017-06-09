import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './Login/login.component'
import {adminComponent} from './Admin/admin.component'
import { UserComponent } from "app/User/user.component";
import { UserNewComponent } from "app/user/user-new/user-new.component";



const appRoutes: Routes =[
    {
        path : '',
        component : LoginComponent
    },
    {
        path : 'admin',
        component : adminComponent
    }
    ,{
        path :'user',
        component:UserComponent,
        children:[{
            path:'',
            component:UserNewComponent
        }]
    }
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    declarations:[adminComponent,UserComponent,LoginComponent,UserNewComponent]

})
export class AppRoutingModule {

}