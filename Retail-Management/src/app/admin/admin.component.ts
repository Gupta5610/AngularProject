import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
 
})
export class AdminComponent implements OnInit {

  itemToSearch:string;
  constructor(private _router:Router,private _activatedRouter:ActivatedRoute) { 
    this.itemToSearch = "";
  
  }

  ngOnInit() {
  }
  
  onAddToCartClicked()
   {
          this._router.navigate(["addForm"])
   }

   onSearchClicked()
   {
         this._router.navigate(["admin",this.itemToSearch])
   }


}
