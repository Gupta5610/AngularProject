import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CrudService } from "app/user/Shared/Service/crud.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  itemToSearch : string;

  constructor(private _router:Router, private _crudService : CrudService) { 
      console.log("UserComponent Constructor Called ... ");
        this._crudService.populateList();
        this.itemToSearch="";
    }

  ngOnInit() {
      console.log("UserComponent ngOnInit Called ... ");
        this._crudService.populateList();
  }

   // search the item accroding to the value in search box 

   onSearchClicked()
   {
      console.log("onSearchClicked ...");
       this._router.navigate(["user",this.itemToSearch])
      
   }

}
