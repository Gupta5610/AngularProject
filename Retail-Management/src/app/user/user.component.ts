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
        this._crudService.populateList();
    }

  ngOnInit() {
        
        this._crudService.populateList();
  }

   onSearchClicked()
   {
       this._router.navigate(["user",this.itemToSearch])
       console.log("hi");
   }

}
