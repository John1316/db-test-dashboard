import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserData: any = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    if (localStorage.getItem('currentUser')) {
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
    let encodedToken: any = localStorage.getItem('currentUser');

    this.currentUserData.next(encodedToken);

  }


  signOut(){
    this.currentUserData.next(null);
    localStorage.removeItem('currentUser');
    this._Router.navigate(['/auth']);
  }
}
