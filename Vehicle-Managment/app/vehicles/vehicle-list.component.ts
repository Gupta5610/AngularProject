import { Component } from '@angular/core';
import { Customer } from '../shared/customer';
import { Router } from '@angular/router';

let lastAction: string;
let lastDeleted: Customer;

@Component({
    // selector: 'vms-app',
    templateUrl: 'app/vehicles/vehicle-list.component.html',
    styleUrls: ['app/vehicles/vehicle-list.component.css']

})


export class VehicleListComponent {
    pageTitle: string = 'Vehicle Service Managment';
    tableTitle: string = 'Vehicle List';
    customers: Array<Customer>;

    constructor(private router: Router) {
        this.getList();


    }
//gets the list from the local storage.
    getList() {
        if (localStorage["cList"]) {
            this.customers = JSON.parse(localStorage["cList"]);

        }
    }

    //navigate to the add form page.
    addVehicle() {
        lastAction = "add";
        this.router.navigate(['/add']);
    }

    //deletes the particular vehicle registration from the list.
    onDelete(data: Customer) {
        lastAction = "delete";
        lastDeleted = data;
        for (let i = 0; i < this.customers.length; i++) {
            if (data.index == this.customers[i].index) {
                this.customers.splice(i, 1);
                localStorage["cList"] = JSON.stringify(this.customers);
            }
        }
    }

    //undo the last added or deleted registration from the list.
    undo() {

        if (lastAction == null) {
            alert("Please perform add or delete action before undo.");
        } else {

            if (lastAction == "add") {
                this.customers.splice(this.customers.length - 1, 1);
            } else {
                this.customers.splice(lastDeleted.index, 0, lastDeleted);
            }
            localStorage["cList"] = JSON.stringify(this.customers);
            lastAction = null;
            lastDeleted = null;
        }
    }
}