import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { CustomerServicesService } from "app/shared/customer-services.service";
import { ICustomer } from "app/shared/ICustomer";


@Component({
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})

export class AddComponent{

    formTitle: string="Add Customer";
    constructor(private _cusService: CustomerServicesService, private _router: Router){

    }

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

    onSaveClick(){
        
        this.customer=this._cusService.calculateCharge(this.customer);
        this._cusService.saveCustomer(this.customer);
        this._router.navigate(["/home"]);

    }

   

}