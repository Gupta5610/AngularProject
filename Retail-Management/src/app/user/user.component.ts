import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _router:Router) { 

  }

  ngOnInit() {
  }

   onSearchClicked()
   {
       this._router.navigate(['/user/search']);
   }

}
