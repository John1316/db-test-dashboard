import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error: string ='';
  actionLoader:boolean= false
  constructor(
    private _AuthService:AuthService,
    private _Router:Router
  ) { }
  auth = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required),
  })
  ngOnInit(): void {
  }
  onLogin(auth:FormGroup){
    this.actionLoader = true;

    this._AuthService.login(auth.value).subscribe(
      (response)=> {
        if (response.message === 'sucess') {
          localStorage.setItem("currentUser", JSON.stringify(response));
          this._Router.navigate(['/home']);
          this._AuthService.saveCurrentUserToken();
          this.actionLoader = false;
        }
      }, error => {
        this.error = error.error.error
        this.actionLoader = false;

      }
    )
  }

}
