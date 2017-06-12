import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
     Administrator ="Login as Admin";
     User ="Login as User";
     title="Retail Inventory Mangement";

  constructor(private _router:Router){
     console.log("LoginComponent constructor called ...")
  }
      // router used to navigate to user component or admin componenet 

       userLogin(){
       console.log("Logging in as User ...")
       this._router.navigate(['/user']);
     }

     adminLogin(){
       console.log("Logging in as Administrator ")
       this._router.navigate(['/admin']);
     }

  ngOnInit() {
    console.log("LoginComponent ngOnInit called ...")
  }

}
