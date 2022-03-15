import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../content/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserData: any = new BehaviorSubject(null);
  userDataContainer:any[]=[];
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    if (sessionStorage.getItem('currentUser' || '{}')) {
      this.saveCurrentUserToken();
      this._Router.navigate(['/home'])
    }
  }


  login(loginUserData: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiUrl}auth/signin`,
      loginUserData
    );
  }
  saveCurrentUserToken() {
    let encodedToken: any = sessionStorage.getItem('currentUser' || '{}');
    this.currentUserData.next(encodedToken)
    this._Router.navigate(['/home']);

  }


  signOut(){
    this.currentUserData.next(null);
    sessionStorage.removeItem('currentUser');
    this._Router.navigate(['/auth']);
  }
}
