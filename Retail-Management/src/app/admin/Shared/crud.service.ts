import { Injectable } from '@angular/core';
import { Iproduct } from "app/shared/Model/iproduct";
import { SearchService } from "app/shared/services/search.service";

@Injectable()
export class CrudService {

  
  products :Iproduct[];

  // serachService used interact with the backend that is firebase in this particullar case 

  constructor(private _serachService:SearchService) { 
      console.log("Admin CrudService Constructor Called ... ")
       this.populateList();
   }

  // to populate the list at will

   populateList()
   {
     console.log("populate list ...")
         this._serachService.getProductList().subscribe(products =>
          this.products=products
       );
   }

   // Add a new product to the present list 

  add(product : Iproduct)
  {
       console.log("Add product ...")

       // getting the Product array from the backend

        this._serachService.getProductList().subscribe(products =>
          this.products=products
       );

       // check if the array contains any value or not 

       if(this.products == null)
        {
          this.products = new Array<Iproduct>();
        }

        // push the product in products and push the list (products) back to search service 

        this.products.push(product);
        this._serachService.putProductList(this.products);
  }


  getList(name:string)
  {
     
     console.log("In get list function of admin .....");
    
      this.populateList();

       // return if search text is undefined and or empty 

     if(name === undefined || name == "")
      { return this.products; }

      // create a Temporary array with products which match the criteria 

       let temp=new Array<Iproduct>();
      
       

      for(let i=0;i<this.products.length;i++)
            {      
              if(this.products[i].name.indexOf(name)!=(-1))
                  {
                   // populate temp  
                    temp.push(this.products[i]);
                  }
            }
      return temp;
  }


  saveData(product : Iproduct)
  {

    console.log("saving product with id "+product.id+" ....")
 
     for(let i=0;i<this.products.length;i++)
            {
              // find the product in the list 
              if(this.products[i].id === product.id )
                  {
                    // replace product with the edited one 
                    this.products[i]= product;
                    break;
                  }
            }

  
    // push the products list to the search service

     this._serachService.putProductList(this.products);
  }

  deletedata(product : Iproduct)
  {   

    console.log("deleting the product with  id " + product.id);

    let i:number;
      for( i=0;i<this.products.length;i++)
            {
              if(this.products[i].id === product.id )
                  {
                    // break at the index when element is find
                    break;
                  }
            }
     
    // delete the product from the list and push it to the searchServic

    this.products.splice(i,1);
    this._serachService.putProductList(this.products);

  }

}
