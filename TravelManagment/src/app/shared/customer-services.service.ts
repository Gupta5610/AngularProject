import { Injectable } from '@angular/core';
import { ICustomer } from "app/shared/ICustomer";

let cusList=new Array<ICustomer>();

@Injectable()
export class CustomerServicesService {

 index:number;

  constructor() { 
    this.getList();
  }

  getList() {
        if (localStorage["cusList"]) {
            cusList = JSON.parse(localStorage["cusList"]);
            return cusList;
        }
    }
   

  saveCustomer(customer:ICustomer){
    //console.log(customer);
       //cusList = [];
    if(localStorage.getItem("cusList")!=null ){

      cusList = JSON.parse(localStorage.getItem("cusList"));
    }
       cusList.push(customer);
      localStorage.setItem("cusList",JSON.stringify(cusList));
    //  console.log(localStorage["cusList"]);

      
  }

    deleteCustomer(customer:ICustomer){
     
        if(confirm('Are you sure you want to delete this?')){
          console.log(customer);
            cusList = JSON.parse(localStorage.getItem("cusList"));
            for(let i=0;i<cusList.length ;i++){
                  if(customer.mobileNo==cusList[i].mobileNo){
                      cusList.splice(i,1);
                      localStorage.setItem("cusList",JSON.stringify(cusList));
                  }
            }
            return cusList;
        }
    }

    // calculate charges according to the given criteria

    calculateCharge(customer : ICustomer)
    {
       
       customer.finalPrice = customer.charges * customer.distance;

      if(customer.type == "Cooprate")
       {
           if(customer.noOfEmployees > 10)
              {
                  customer.finalPrice = 0.85 * customer.finalPrice;
              }
           else
              {
                  customer.finalPrice = 0.90 * customer.finalPrice;
              }   
       }
       else
       {
           if(customer.subscribed)
             {
                 customer.finalPrice = 0.95 * customer.finalPrice;
             }
       }

      return customer;
    }


    displayCustomer(customer:ICustomer,mobileNo:Number){
      for(let i=0;i<cusList.length;i++){
            if(mobileNo==cusList[i].mobileNo){
                this.index=i;
                customer.name=cusList[i].name;
                customer.age=cusList[i].age;
                customer.description=cusList[i].description;
                customer.mobileNo=cusList[i].mobileNo;
                customer.type=cusList[i].type;
                customer.subscribed=cusList[i].subscribed;
                customer.pickUp=cusList[i].pickUp;
                customer.charges=cusList[i].charges;
                customer.noOfEmployees=cusList[i].noOfEmployees;
                customer.distance=cusList[i].distance;
                return customer;
            }
        }
    }


    updateCustomer(customer:ICustomer){
        cusList[this.index].name=customer.name;
        cusList[this.index].age=customer.age;
        cusList[this.index].name=customer.name;
        cusList[this.index].description=customer.description;
        cusList[this.index].mobileNo=customer.mobileNo;
        cusList[this.index].type=customer.type;
        cusList[this.index].subscribed=customer.subscribed;
        cusList[this.index].pickUp=customer.pickUp;
        cusList[this.index].charges=customer.charges;
        cusList[this.index].noOfEmployees=customer.noOfEmployees;
        cusList[this.index].distance=customer.distance;
        
      

        localStorage["cusList"]=JSON.stringify(cusList);
        return cusList;
    }

}
