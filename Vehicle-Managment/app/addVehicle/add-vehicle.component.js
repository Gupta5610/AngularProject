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
var cList = new Array();
var AddVehicleComponent = (function () {
    //assigns the default values to the object of customer type.
    function AddVehicleComponent(router) {
        this.router = router;
        this.data = {
            firstName: '',
            lastName: '',
            registrationNo: null,
            mobileNo: null,
            address: '',
            pickUpDate: null,
            returnDate: null,
            index: 1
        };
    }
    //on clicking the submit button of form the value will be stored in local storage.
    AddVehicleComponent.prototype.onSubmitForm = function () {
        var data1;
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
    };
    return AddVehicleComponent;
}());
AddVehicleComponent = __decorate([
    core_1.Component({
        // selector: 'add-vehicle',
        templateUrl: 'app/addvehicle/add-vehicle.component.html',
        styleUrls: ['app/addVehicle/add-vehicle.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AddVehicleComponent);
exports.AddVehicleComponent = AddVehicleComponent;
//# sourceMappingURL=add-vehicle.component.js.map