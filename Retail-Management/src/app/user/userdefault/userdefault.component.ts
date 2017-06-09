import { Component, OnInit } from '@angular/core';
import { Iproduct } from "app/admin/Shared/Model/iproduct";
import { CrudService } from "app/user/Shared/Service/crud.service";

@Component({
  selector: 'app-userdefault',
  templateUrl: './userdefault.component.html',
  styleUrls: ['./userdefault.component.scss']
})
export class UserdefaultComponent implements OnInit {

  title:string = "OfferList";
  button:string = "Add to cart";
  products : Iproduct[];

   constructor(private _crudService:CrudService) {
     this.products=this._crudService.getList();
     console.log(this.products);
   }

  ngOnInit() {
  } 

  onButtonClick(product: Iproduct)
  {
   this._crudService.onButtonClicked(product,this.products);
  }

}
