import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getSlider(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}sliders_index`)
  }
  getSliderDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}sliders_update_data/${id}`)
  }
  createSlider(
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    return this._HttpClient.post(`${environment.apiUrl}sliders_store` , formData)
  }
  updateSlider(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,



  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    return this._HttpClient.post(`${environment.apiUrl}sliders_update/${id}` , formData)
  }
  deleteSlider(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}sliders_destroy/${id}` , formData)
  }}
