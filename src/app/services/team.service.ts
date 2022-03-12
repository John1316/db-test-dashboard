import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getTeams(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}teams_index`)
  }


  getTeamDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}teams_update_data/${id}`)
  }


  CreateTeam(
    en_name: any,
    ar_name: any,
    en_role: any,
    ar_role: any,
    facebook: any,
    instagram: any,
    twitter: any,
    image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_name',en_name);
    formData.append('ar_name',ar_name);
    formData.append('en_role',en_role);
    formData.append('ar_role',ar_role);
    formData.append('facebook',facebook);
    formData.append('instagram',instagram);
    formData.append('twitter',twitter);

    formData.append('image',image);
    return this._HttpClient.post(`${environment.apiUrl}teams_store` , formData)
  }
  updateTeam(
    id:number,
    en_name: any,
    ar_name: any,
    en_role: any,
    ar_role: any,
    facebook: any,
    instagram: any,
    twitter: any,
    image: File,


  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_name',en_name);
    formData.append('ar_name',ar_name);
    formData.append('en_role',en_role);
    formData.append('ar_role',ar_role);
    formData.append('facebook',facebook);
    formData.append('instagram',instagram);
    formData.append('twitter',twitter);

    formData.append('image',image);
    return this._HttpClient.post(`${environment.apiUrl}teams_update/${id}` , formData)
  }
  deleteTeam(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}teams_destroy/${id}` , formData)
  }
}
