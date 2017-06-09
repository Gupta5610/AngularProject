import { Injectable } from '@angular/core';
import { Iproduct } from "app/admin/Shared/Model/iproduct";

@Injectable()
export class CrudService {
  
  id :number;
  products =new Array<Iproduct>();

  constructor() { 
   
  }

  add(product : Iproduct)
  {
      if(localStorage.getItem("list"))
        {
          this.products = JSON.parse(localStorage.getItem("list"));
        }

       
        this.products.push(product);

        localStorage.setItem("list",JSON.stringify(this.products));
  }

  edit()
  {

  }

  getList(name:string)
  {
     this.products=JSON.parse(localStorage.getItem("list"));
      console.log("IN get" +this.products);
     let temp=new Array<Iproduct>();
     if(name === undefined || name == "")
      { return this.products; }
      
      for(let i=0;i<this.products.length;i++)
            {
              debugger;
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

}
