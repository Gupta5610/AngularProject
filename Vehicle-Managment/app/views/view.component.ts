import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../shared/customer';



@Component({
    
    templateUrl: 'app/views/view.component.html',
    styleUrls: ['app/views/view.component.css']
})


export class ShowVehicleComponent implements OnInit{
    public firstName: string;
    public lastName: string;
    public registrationNo: string;
    public mobileNo: number;
    public address: string;
    public pickUpDate: Date;
    public returnDate: Date;
    customers: Array<Customer>=JSON.parse(localStorage["cList"]);

    constructor(private _route:ActivatedRoute){

    }

//shows the values of the particular customer.
    ngOnInit(): void{
        let index=+this._route.snapshot.params['index'];
        for(let i=0;i<this.customers.length;i++){
            if(index==this.customers[i].index){
                this.firstName=this.customers[i].firstName;
                this.lastName=this.customers[i].lastName;
                this.registrationNo=this.customers[i].registrationNo;
                this.mobileNo=this.customers[i].mobileNo;
                this.address=this.customers[i].address;
                this.pickUpDate=this.customers[i].pickUpDate;
                this.returnDate=this.customers[i].returnDate;
            }
        }

    }
}