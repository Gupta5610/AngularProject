import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { AdminComponent } from './admin.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';

import { CrudService } from "app/admin/Shared/crud.service";

@NgModule({
  imports: [ FormsModule,
    CommonModule,RouterModule.forChild([
      {
        path : 'admin',
        component : AdminComponent,

       // In both cases the admin search compenent will be loaded 

        children :[ 
           {
             path : '',
             component : AdminSearchComponent
           },
           {
             
             path : ':searchText',
             component : AdminSearchComponent
           }
        ]
      }
    ])
  ],
   providers: [CrudService],
  declarations: [AdminComponent, AdminSearchComponent]
  
})
export class AdminModule { 

  /**
   *
   */
  constructor() {
   console.log("Admin Module Loaded ...");
    
  }
}
