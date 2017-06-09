import { Component, OnInit } from '@angular/core';

import { Iproduct } from "app/admin/Shared/Model/iproduct";
import { CrudService } from "app/user/Shared/Service/crud.service";


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  
  button:string;
 
  products : Iproduct[];
  constructor(private _crudService : CrudService ) { 
    this.products=_crudService.getList();
    this.button="Add To Cart";
  }

  onButtonClick(product: Iproduct)
  {
   this._crudService.onButtonClicked(product,this.products);
  }

  ngOnInit() {
  }

}
