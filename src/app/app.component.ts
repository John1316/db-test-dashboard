import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogined:boolean = false;
  constructor(
    private _AuthService:AuthService
  ){
    _AuthService.currentUserData.subscribe(()=>{
      if (_AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;

        // console.log(this._AuthService);
        // this.firstName = this._AuthService.currentUserData.value.first_name;
        // console.log(this.firstName);
      }
      else{
        this.isLogined = true;

      }
    })
    
  }

}
