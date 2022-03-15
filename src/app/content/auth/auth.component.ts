import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error:string = '';
  actionLoader:boolean= false

  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _Title:Title
  ) { }
  auth = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this._Title.setTitle(`Digital bond | Login`)

  }
  submit(auth:FormGroup){
    this.actionLoader = true
    this._AuthService.login(auth.value).subscribe(
      (response) => {
        if (response.message === 'sucess') {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          sessionStorage.setItem('currentUsername', JSON.stringify(response.user.name));
          // sess
          this._AuthService.saveCurrentUserToken();
          this._Router.navigate(['/home']);
          this.actionLoader = false;

        }
      }, error => {
        if (error.status === 401) {

          this.error = error.error.error
          this.actionLoader = false;

        }
      }
    )

  }
}
