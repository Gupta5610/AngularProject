import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICustomer} from '../shared/ICustomer';
import { CustomerServicesService } from "app/shared/customer-services.service";

@Component({
    // selector: 'firstPage',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css'],
   
})


export class CustomersComponent{
    pageTitle: string="Travel Managment";
    tableTitle: string="Customers List";

    customersList: ICustomer[];

    constructor(private _serviceObj:CustomerServicesService,private _router:Router ){
        this.customersList=this._serviceObj.getList();
    }   

    addCustomer(){
        this._router.navigate(['/add']);
    }

    onDeleteClick(customer:ICustomer){
        this.customersList=this._serviceObj.deleteCustomer(customer);
        
    }

    
}