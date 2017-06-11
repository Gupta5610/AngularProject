import { Component, OnInit } from '@angular/core';
import { CrudService } from "app/user/Shared/Service/crud.service";
import { Iproduct } from "app/shared/Model/iproduct";

@Component({
  selector: 'app-userdefault',
  templateUrl: './userdefault.component.html',
  styleUrls: ['./userdefault.component.scss']
})
export class UserdefaultComponent implements OnInit {

  title:string = "OfferList";
  button:string = "Add to cart";
  products : Iproduct[];
  recentProducts : Iproduct[];

   constructor(private _crudService:CrudService) {
     this.products=this._crudService.getOfferList();
    //  this.recentProducts=this._crudService.getRecentProducts();
    //  console.log(this.recentProducts);
     console.log(this.products);
   }

  ngOnInit() {
  } 

  onButtonClick(product: Iproduct)
  {
   this._crudService.onButtonClicked(product);
  }

}
