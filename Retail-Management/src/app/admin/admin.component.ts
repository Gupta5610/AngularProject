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
      }
  }

  ngOnInit() {
    this._crudService.populateList();
  }
  
  onAddToCartClicked()
   {
          this.showModal();
   }

   onSearchClicked()
   {
         this._router.navigate(["admin",this.itemToSearch])
   }

    onAddProduct()
    {

    this._crudService.add(this.product);
    this.closeModal();
    this._router.navigate(['/admin']);
    
   }

    showModal(){
	  	       
	  	  document.getElementById("overlay").style.display = "block";
        document.getElementById('AddModal').style.display = "block";

	  }

     closeModal(){
          document.getElementById("overlay").style.display = "none";
          document.getElementById('AddModal').style.display = "none";  
      } 


}
