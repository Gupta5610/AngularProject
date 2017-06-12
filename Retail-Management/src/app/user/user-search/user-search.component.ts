import { Component, OnInit } from '@angular/core';

import { CrudService } from "app/user/Shared/Service/crud.service";
import { Iproduct } from "app/shared/Model/iproduct";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  
  button:string;
  product : string;
  products : Iproduct[];
  productName : string;
  
  constructor(private _crudService : CrudService,private _activated:ActivatedRoute) { 
     console.log("UserSearchCompenent Constructor called ... ");
      this._activated.params.subscribe(parmas=>this.ngOnInit());
     
  }

 // add / remove from the user cart 

  onButtonClick(product: Iproduct)
  {
    console.log("onButtonClick ...");
    this._crudService.onButtonClicked(product);
  }
 
 
  ngOnInit() {
    
     console.log("UserSearchCompenent ngOnInit called ... ");

     this.productName = this._activated.snapshot.params["searchText"];
     this.products=this._crudService.getList(this.productName);
  }

}
