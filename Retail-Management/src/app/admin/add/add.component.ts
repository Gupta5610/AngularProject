import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/common'
import { Iproduct } from "app/admin/Shared/Model/iproduct";
import { Router } from "@angular/router";
import { CrudService } from "app/admin/Shared/crud.service";

@Component({
  selector: 'app-add',
  templateUrl: '../Shared/view/add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  product : Iproduct;
  constructor(private _router: Router, private _crudService:CrudService) {
      this.product={
            name : '',
            type : '',
            discount : 0,
            include : false,
            cart : false,
            cost : 0,
            id : 0,
      }
   }

  ngOnInit() {
  }

  onAddProduct()
  {
   
    this._crudService.add(this.product);
    this._router.navigate(['/admin']);
  }
 


}
