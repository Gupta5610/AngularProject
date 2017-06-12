import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  title = "Retail Inventory Management";

  constructor(private _router:Router) {
    console.log("AppComponent Constructor called ...")
   }
  
  // To navigate back to the login component 
  onHomeClicked()
  {
    console.log("onHomeClicked ...")
    this._router.navigate(['/']);
  }
}
