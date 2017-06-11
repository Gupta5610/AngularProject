import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { AdminComponent } from './admin.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';

import { CrudService } from "app/admin/Shared/crud.service";
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [ FormsModule,
    CommonModule,RouterModule.forChild([
      {
        path : 'admin',
        component : AdminComponent,
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
  declarations: [AdminComponent, AdminSearchComponent, EditComponent]
  
})
export class AdminModule { }
