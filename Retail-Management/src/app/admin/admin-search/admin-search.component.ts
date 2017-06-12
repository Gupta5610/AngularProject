import { Component, OnInit } from '@angular/core';
import { CrudService } from "app/admin/Shared/crud.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Iproduct } from "app/shared/Model/iproduct";

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})


export class AdminSearchComponent implements OnInit {
 
  productName : string ;
  products : Iproduct[];
  product : Iproduct;

  constructor(private _router:Router,private _crudService:CrudService,private _activated:ActivatedRoute) {
    console.log("AdminSearchComponent constructor loaded ....");

      this._activated.params.subscribe(parmas=>this.ngOnInit());
      
     // initialize the product   

     this.product={
            name : '',
            type : '',
            discount : 0,
            include : false,
            cart : false,
            cost : 0,
            id : Date.now(),
            inStock : false
      }
   }

   
  ngOnInit() {
    
     console.log("AdminSearchComponent ngOnInit loaded ....");

     this.productName = this._activated.snapshot.params["searchText"];
     this.products=this._crudService.getList(this.productName);
  }

  // edit data

  onEditClicked(product)
  {
    console.log("OnEditClicked ...")
     this.showModal();
     this.product=product;
  }

  // save data  

  onSaveClicked()
  {
    console.log("onSavedclicked ... ");
    this._crudService.saveData(this.product);
    this.closeModal();
  }

  // delete data

  onDeleteClicked()
  {
    console.log("onDeleteClicked ...");
    this._crudService.deletedata(this.product);
    this.closeModal();
  }

  // display the modal 

	 showModal(){
	      console.log("show modal");
	  	  document.getElementById("overlay").style.display = "block";
        document.getElementById('myModal').style.display = "block";

	  }

   // hide the modal 

   closeModal(){
        console.log("close modal");
          document.getElementById("overlay").style.display = "none";
          document.getElementById('myModal').style.display = "none";  
   }

}
