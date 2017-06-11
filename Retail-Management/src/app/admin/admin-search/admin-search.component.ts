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
      this._activated.params.subscribe(parmas=>this.ngOnInit());
       this.product={
            name : '',
            type : '',
            discount : 0,
            include : false,
            cart : false,
            cost : 0,
            id : Date.now(),
      }
   }

   
  ngOnInit() {
     this.productName = this._activated.snapshot.params["searchText"];
     console.log(this.productName); 
     this.products=this._crudService.getList(this.productName);
     console.log(this.products);
  }

  onEditClicked(product)
  {
     this.showModal();
     this.product=product;
  }


  onSaveClicked()
  {
    console.log("on saved clicked : "+this.product.id);
    this._crudService.saveData(this.product);
    this.closeModal();
  }

  onDeleteClicked()
  {
    console.log(this.product.id);
    this._crudService.deletedata(this.product);
    this.closeModal();
  }

  
	 showModal(){
	         
	  	  document.getElementById("overlay").style.display = "block";
        document.getElementById('myModal').style.display = "block";

	  }

     closeModal(){
          document.getElementById("overlay").style.display = "none";
          document.getElementById('myModal').style.display = "none";  
      }

}
