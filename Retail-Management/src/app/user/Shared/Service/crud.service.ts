import { Injectable } from '@angular/core';
import { Iproduct } from "app/admin/Shared/Model/iproduct";

@Injectable()
export class CrudService {
   products : Iproduct[];
  constructor() {
    this.products=JSON.parse(localStorage.getItem("list"));
   }

    getList()
    {
      return JSON.parse(localStorage.getItem("list"));
    }

    onButtonClicked(product : Iproduct,products)
    {
        this.products=products
        console.log(product);
        product.cart=!product.cart;
        localStorage.setItem("list",JSON.stringify(this.products));    
    }

}
