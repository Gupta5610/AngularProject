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
     console.log("UserDefaultCompenent Constructor called ... ");
     this.products=this._crudService.getOfferList(); 
   }

  ngOnInit() {
     console.log("UserDefaultCompenent ngOnInit called ... ");
  } 

  // To add / Remove from the cart 

  onButtonClick(product: Iproduct)
  {
    console.log("onButtonClick ...");
   this._crudService.onButtonClicked(product);
  }

}
