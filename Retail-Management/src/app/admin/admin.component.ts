import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CrudService } from "app/admin/Shared/crud.service";
import { Iproduct } from "app/shared/Model/iproduct";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
 
})
export class AdminComponent implements OnInit {

  itemToSearch:string;
  product : Iproduct;

  constructor(private _router:Router,private _crudService: CrudService) { 
    console.log("AdminComponent constructor called ...")
    this.itemToSearch = "";
    this._crudService.populateList();
      this.product={
            name : '',
            type : '',
            discount : 0,
            include : false,
            cart : false,
            cost : 0,
            id : Date.now(),
            inStock : true
      }
  }

  ngOnInit() {

    console.log("AdminComponent ngOnInit called ...")
    this._crudService.populateList();
  }
  
  // show add modal 

  onAddProduct()
   {
      console.log("onAddProduct ...");
       this.showModal();
   }

   // search the product from the list 

   onSearchClicked()
   {
      console.log("onSearchClicked ...");  
      this._router.navigate(["admin",this.itemToSearch])
   }

   // add the product to the list 

    onAddProductToList()
    {
    
        console.log("onAddProductToList ...");
            this._crudService.add(this.product);
            this.closeModal();
            this._router.navigate(['/admin']);
            
   }

    showModal(){
	  	 
        console.log("Show Modal");
          document.getElementById("overlay").style.display = "block";
          document.getElementById('AddModal').style.display = "block";

	  }

     closeModal(){
       
       console.log("Close Modal ");
          document.getElementById("overlay").style.display = "none";
          document.getElementById('AddModal').style.display = "none";  
   } 


}
