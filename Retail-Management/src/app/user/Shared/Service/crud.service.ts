import { Injectable } from '@angular/core';
import { Iproduct } from "app/shared/Model/iproduct";
import { SearchService } from "app/shared/services/search.service";

@Injectable()
export class CrudService {
   products : Iproduct[];
   recentProducts : Iproduct[];
  
  constructor(private _serachService:SearchService) {
     this.populateList();
   }

   populateList()
   {
         this._serachService.getPost().subscribe(products =>
          this.products=products
       );
   }
  
 
   getOfferList()
   {
     return this.products;
   }

   getList(name:string)
   {
     this._serachService.getPost().subscribe(products =>
          this.products=products
       );
     
      console.log("IN get" +this.products);
     let temp=new Array<Iproduct>();
     if(name === undefined || name == "")
      { return this.products; }
      
      for(let i=0;i<this.products.length;i++)
            {
              
              console.log()
              console.log();
            
              if(this.products[i].name.indexOf(name)!=(-1))
                  {
                    temp.push(this.products[i]);
                  }
            }

          
            console.log("In get "+temp)
      return temp;
   }

    onButtonClicked(product : Iproduct)
    {
       
        console.log(product);
        for(var i =0;i<this.products.length;i++)
        {
           if(this.products[i].name==product.name)
              {
                  this.products[i]=product;
              }
        }
        product.cart=!product.cart;
      
         this._serachService.putpost(this.products);
    }

}
