import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SearchService } from "app/shared/services/search.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  Administrator ="Admin";
     User ="User";
     title="Retail Inventory Mangement";

  constructor(private _router:Router,private _service : SearchService){}
     userLogin(){
       this._router.navigate(['/user']);
     }

     adminLogin(){
       this._router.navigate(['/admin']);
     }

  ngOnInit() {
  }

}
