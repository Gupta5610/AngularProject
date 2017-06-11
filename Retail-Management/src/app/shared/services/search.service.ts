import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Iproduct } from "app/shared/Model/iproduct";



@Injectable()
export class SearchService {

  constructor(private http:Http) { 
    console.log("Search Service initialized ......");
  }

   getPost()
    {
        return this.http.get('https://retail-app-bd8a5.firebaseio.com/list.json')
        .map(res => res.json());
    }

    putpost(Products:Iproduct[])
    {
         const header = new Headers();
         header.append('Content-type','application/json: charset=utf-8');

         this.http.put('https://retail-app-bd8a5.firebaseio.com/list.json',JSON.stringify(Products),header).subscribe(
             () => {}
         );
    }

  

}
