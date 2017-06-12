import { Injectable } from '@angular/core';
import { Iproduct } from "app/shared/Model/iproduct";
import { SearchService } from "app/shared/services/search.service";

@Injectable()
export class CrudService {
   products : Iproduct[];
   recentProducts : Iproduct[];
  
  constructor(private _serachService:SearchService) {
    console.log("User CrudService Constructor Called ... ")
     this.populateList();
   }

   populateList()
   {
        console.log("PopulateList ... ")
         this._serachService.getProductList().subscribe(products =>
         this.products=products
       );
   }
  
   // return the list and check for valid offers and inStock 

   getOfferList()
   {
     console.log("getOfferList ...")
     this.populateList();
     return this.products;
   }

   getList(name:string)
   {
     console.log("User getList ... ")
    
     this.populateList();
     
     // create a temporry list  
     let temp=new Array<Iproduct>();
     if(name === undefined || name == "")
      { return this.products; }
      
      for(let i=0;i<this.products.length;i++)
            {
              if(this.products[i].name.indexOf(name)!=(-1))
                  {
                    // populate the list according to the criteria 
                    temp.push(this.products[i]);
                  }
            }

      return temp;
   }

   // add / remove the product from cart 

    onButtonClicked(product : Iproduct)
    {
       
        console.log("onButtonClicked ... ");
        for(var i =0;i<this.products.length;i++)
        {
           if(this.products[i].id==product.id)
              {
                  this.products[i]=product;
              }
        }
        product.cart=!product.cart;
        this._serachService.putProductList(this.products);
    }

}
