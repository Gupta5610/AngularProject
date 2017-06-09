import { Component, OnInit } from '@angular/core';
import { Iproduct } from "app/admin/Shared/Model/iproduct";
import { CrudService } from "app/admin/Shared/crud.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent implements OnInit {
  productName : string;
  products : Iproduct[];
  constructor(private _crudService:CrudService,private _activated:ActivatedRoute) {
    
      this._activated.params.subscribe(parmas=>this.ngOnInit());
   }
  ngOnInit() {
     this.productName = this._activated.snapshot.params["searchText"];
     console.log(this.productName); 
     this.products=this._crudService.getList(this.productName);
     console.log(this.products);
  }

}
