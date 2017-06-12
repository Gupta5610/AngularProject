import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { Router } from '@angular/router';

let cList = new Array<Customer>();

@Component({
    // selector: 'add-vehicle',
    templateUrl: 'app/addvehicle/add-vehicle.component.html',
    styleUrls: ['app/addVehicle/add-vehicle.component.css']
})


export class AddVehicleComponent {

//assigns the default values to the object of customer type.
    constructor(private router: Router) { }

    data: Customer={
        firstName: '',
        lastName: '',
        registrationNo: null,
        mobileNo: null,
        address: '',
        pickUpDate: null,
        returnDate: null,
        index: 1
    }

//on clicking the submit button of form the value will be stored in local storage.
    onSubmitForm() {
       
        var data1: Customer;



        if (localStorage["cList"]) {

            cList = JSON.parse(localStorage["cList"]);
            if (cList.length != 0) {
                data1 = cList.pop();
                this.data.index = data1.index + 1;
                cList.push(data1);
            }

        }

        cList.push(this.data);

        localStorage["cList"] = JSON.stringify(cList);
        this.router.navigate(['/home']);
    }

}
