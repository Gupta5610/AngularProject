import { Injectable } from '@angular/core';
import { Iproduct } from "app/shared/Model/iproduct";
import { SearchService } from "app/shared/services/search.service";

@Injectable()
export class CrudService {
  
  
  products :Iproduct[];

  constructor(private _serachService:SearchService) { 
       this.populateList();
   }

   populateList()
   {
         this._serachService.getPost().subscribe(products =>
          this.products=products
       );
   }
  add(product : Iproduct)
  {
        
        this._serachService.getPost().subscribe(products =>
          this.products=products
       );

       if(this.products == null)
        {
          this.products = new Array<Iproduct>();
        }

        this.products.push(product);
       this._serachService.putpost(this.products);
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
                    let k : number = Date.now();
                    this.products[i].id=k;
                    temp.push(this.products[i]);
                  }
            }
            console.log("In get "+temp)
      return temp;
  }

  saveData(product : Iproduct)
  {
 
    console.log("save data "+product.id); 

     for(let i=0;i<this.products.length;i++)
            {
              if(this.products[i].id === product.id )
                  {
                    this.products[i]= product;
                    break;
                  }
            }

     this._serachService.putpost(this.products);
  }

  deletedata(product : Iproduct)
  {   
    let i:number;

      for( i=0;i<this.products.length;i++)
            {
              if(this.products[i].id === product.id )
                  {
                    break;
                  }
            }
     
    this.products.splice(i,1);
    this._serachService.putpost(this.products);

  }

}
