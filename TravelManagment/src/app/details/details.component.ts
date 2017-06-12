import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ICustomer } from "app/shared/ICustomer";
import { CustomerServicesService } from "app/shared/customer-services.service";

@Component({
  selector: 'app-details',
  templateUrl: '../add/add.component.html',
  styleUrls: ['../add/add.component.css']
})



export class DetailsComponent implements OnInit {
  elements = document.getElementsByTagName("input");
  buttons = document.getElementsByTagName("button");

  formTitle: string = "Customer Form (View Only)";

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

  constructor(private _activatedRouter: ActivatedRoute, private _serviceObj: CustomerServicesService) {

  }

  ngOnInit() {
    let number = +this._activatedRouter.snapshot.params['mobileNo'];
    this.customer = this._serviceObj.displayCustomer(this.customer, number);
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].setAttribute("disabled", "disabled");
    }
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].style.visibility = "hidden";
    }
  }

}