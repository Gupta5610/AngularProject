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
var lastAction;
var lastDeleted;
var VehicleListComponent = (function () {
    function VehicleListComponent(router) {
        this.router = router;
        this.pageTitle = 'Vehicle Service Managment';
        this.tableTitle = 'Vehicle List';
        this.getList();
    }
    //gets the list from the local storage.
    VehicleListComponent.prototype.getList = function () {
        if (localStorage["cList"]) {
            this.customers = JSON.parse(localStorage["cList"]);
        }
    };
    //navigate to the add form page.
    VehicleListComponent.prototype.addVehicle = function () {
        lastAction = "add";
        this.router.navigate(['/add']);
    };
    //deletes the particular vehicle registration from the list.
    VehicleListComponent.prototype.onDelete = function (data) {
        lastAction = "delete";
        lastDeleted = data;
        for (var i = 0; i < this.customers.length; i++) {
            if (data.index == this.customers[i].index) {
                this.customers.splice(i, 1);
                localStorage["cList"] = JSON.stringify(this.customers);
            }
        }
    };
    //undo the last added or deleted registration from the list.
    VehicleListComponent.prototype.undo = function () {
        if (lastAction == null) {
            alert("Please perform add or delete action before undo.");
        }
        else {
            if (lastAction == "add") {
                this.customers.splice(this.customers.length - 1, 1);
            }
            else {
                this.customers.splice(lastDeleted.index, 0, lastDeleted);
            }
            localStorage["cList"] = JSON.stringify(this.customers);
            lastAction = null;
            lastDeleted = null;
        }
    };
    return VehicleListComponent;
}());
VehicleListComponent = __decorate([
    core_1.Component({
        // selector: 'vms-app',
        templateUrl: 'app/vehicles/vehicle-list.component.html',
        styleUrls: ['app/vehicles/vehicle-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], VehicleListComponent);
exports.VehicleListComponent = VehicleListComponent;
//# sourceMappingURL=vehicle-list.component.js.map