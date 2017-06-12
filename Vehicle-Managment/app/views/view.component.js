"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ShowVehicleComponent = (function () {
    function ShowVehicleComponent(_route) {
        this._route = _route;
        this.customers = JSON.parse(localStorage["cList"]);
    }
    //shows the values of the particular customer.
    ShowVehicleComponent.prototype.ngOnInit = function () {
        var index = +this._route.snapshot.params['index'];
        for (var i = 0; i < this.customers.length; i++) {
            if (index == this.customers[i].index) {
                this.firstName = this.customers[i].firstName;
                this.lastName = this.customers[i].lastName;
                this.registrationNo = this.customers[i].registrationNo;
                this.mobileNo = this.customers[i].mobileNo;
                this.address = this.customers[i].address;
                this.pickUpDate = this.customers[i].pickUpDate;
                this.returnDate = this.customers[i].returnDate;
            }
        }
    };
    return ShowVehicleComponent;
}());
ShowVehicleComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/views/view.component.html',
        styleUrls: ['app/views/view.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ShowVehicleComponent);
exports.ShowVehicleComponent = ShowVehicleComponent;
//# sourceMappingURL=view.component.js.map