import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ICustomer } from "app/shared/ICustomer";
import { CustomerServicesService } from "app/shared/customer-services.service";



@Component({
  selector: 'app-update',
  templateUrl: '../add/add.component.html',
  styleUrls: ['../add/add.component.css']
})


export class UpdateComponent implements OnInit {

   public formTitle: string="Update Form";
   
   customers: ICustomer[];

   customer: ICustomer = {
        name: '',
        age: null,
        description: '',
        mobileNo: null,
        type: '',
        subscribed: null,
        pickUp: null,
        charges: null,
        noOfEmployees: null,
        distance: null,
        finalPrice : null
    };

    constructor(private _cusService: CustomerServicesService,private _activateRouter:ActivatedRoute,private _serviceObj:CustomerServicesService,private _router:Router){
        this.customers=this._serviceObj.getList();
    }

    ngOnInit(){
        let number=+this._activateRouter.snapshot.params['mobileNo'];
        this.customer=this._serviceObj.displayCustomer(this.customer,number); 
       
        document.getElementById("save").remove();
        document.getElementById("reset").remove();
      
        var btn=document.createElement("button");
        let css : string = ` color: white;
                            height: 40px;
                            width: 120px;
                            background-color: darkred;
                            border-radius: 5px;
                            border-style: none;
                            font-family: cursive;
                            font-size: large;
                            margin-left: 40%;
                            margin-top: 10px;
                            box-shadow: 5px 5px 5px grey;`;
                            
        btn.innerHTML="update";
        btn.setAttribute("style",css);
        document.getElementById("test").appendChild(btn);
                    
    }

    onSaveClick(){
        
         this.customer=this._cusService.calculateCharge(this.customer);
        this.customers=this._serviceObj.updateCustomer(this.customer);
        this._router.navigate(['/home']);

    }

  

}
