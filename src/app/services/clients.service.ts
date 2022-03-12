import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getClients(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}clients_index`)
  }
  getClientDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}clients_update_data/${id}`)
  }
  CreateClient(
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    type: any,
    logo: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('type',type);

    formData.append('logo',logo);
    return this._HttpClient.post(`${environment.apiUrl}clients_store` , formData)
  }
  updateClient(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    type: any,
    logo: File,


  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('type',type);

    formData.append('logo',logo);
    return this._HttpClient.post(`${environment.apiUrl}clients_update/${id}` , formData)
  }
  deleteClient(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}clients_destroy/${id}` , formData)
  }
}
