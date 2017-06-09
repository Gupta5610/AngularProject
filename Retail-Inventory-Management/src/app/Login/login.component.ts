import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
     Administrator ="Admin";
     User ="User";
     title="Retail Inventory Mangement";

     constructor(private _router:Router){
     }
     userLogin(){
       this._router.navigate(['/user']);
     }

     adminLogin(){
       this._router.navigate(['/admin']);
     }
}
