import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getAboutUsTable(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}about_us_page_index`)
  }
  UpdateAboutUs(
    en_about_section_title: any,
    ar_about_section_title: any,
    en_about_section_text: any,
    ar_about_section_text: any,
    en_vision_title: any,
    ar_vision_title: any,
    en_vision_text: any,
    ar_vision_text: any,
    en_mission_title: any,
    ar_mission_title: any,
    en_mission_text: any,
    ar_mission_text: any,
    about_banner_image: File,
    about_section_image: File,
    mission_vision_image: File,
  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_about_section_title',en_about_section_title);
    formData.append('ar_about_section_title',ar_about_section_title);
    formData.append('en_about_section_text',en_about_section_text);
    formData.append('ar_about_section_text',ar_about_section_text);
    formData.append('en_vision_title',en_vision_title);
    formData.append('ar_vision_title',ar_vision_title);
    formData.append('en_vision_text',en_vision_text);
    formData.append('ar_vision_text',ar_vision_text);
    formData.append('en_mission_title',en_mission_title);
    formData.append('ar_mission_title',ar_mission_title);
    formData.append('en_mission_text',en_mission_text);
    formData.append('ar_mission_text',ar_mission_text);
    formData.append('about_banner_image',about_banner_image);
    formData.append('mission_vision_image',mission_vision_image);
    formData.append('about_section_image',about_section_image);
    return this._HttpClient.post(`${environment.apiUrl}about_us_page_update/1`,

      formData,
      {
        reportProgress: true,
        observe:'events'
      }
    )
  }
}
