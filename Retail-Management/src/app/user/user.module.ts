import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UserComponent } from './user.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserdefaultComponent } from './userdefault/userdefault.component';
import { CrudService } from "app/user/Shared/Service/crud.service";




@NgModule({
  imports: [FormsModule,
    CommonModule,
    RouterModule.forChild([
        {
              
          path : 'user',
          component : UserComponent,
          children:[{
             
                path : '',
                component : UserdefaultComponent,      
          },
          {
                path : ':searchText',
                component : UserSearchComponent
          },

          ]
        }
     ])
  ],
  providers: [CrudService],
  declarations: [UserComponent, UserdefaultComponent, UserSearchComponent]
})
export class UserModule { }
