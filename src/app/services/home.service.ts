import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getHome():Observable<any>{

    return this._HttpClient.get(`${environment.apiUrl}home_page_index`)
  }
  updateHome(
    en_about_home_title: any,
    ar_about_home_title: any,
    en_about_home_text: any,
    ar_about_home_text: any,
    en_first_icon_title: any,
    ar_first_icon_title: any,
    en_second_icon_title: any,
    ar_second_icon_title: any,
    en_third_icon_title: any,
    ar_third_icon_title: any,
    en_fourth_icon_title: any,
    ar_fourth_icon_title: any,
    first_icon: File,
    second_icon: File,
    third_icon: File,
    fourth_icon: File,
  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_about_home_title',en_about_home_title);
    formData.append('ar_about_home_title',ar_about_home_title);
    formData.append('en_about_home_text',en_about_home_text);
    formData.append('ar_about_home_text',ar_about_home_text);
    formData.append('en_first_icon_title',en_first_icon_title);
    formData.append('ar_first_icon_title',ar_first_icon_title);
    formData.append('en_second_icon_title',en_second_icon_title);
    formData.append('ar_second_icon_title',ar_second_icon_title);
    formData.append('en_third_icon_title',en_third_icon_title);
    formData.append('ar_third_icon_title',ar_third_icon_title);
    formData.append('en_fourth_icon_title',en_fourth_icon_title);
    formData.append('ar_fourth_icon_title',ar_fourth_icon_title);
    formData.append('first_icon',first_icon);
    formData.append('second_icon',second_icon);
    formData.append('third_icon',third_icon);
    formData.append('fourth_icon',fourth_icon);
    return this._HttpClient.post(`${environment.apiUrl}home_page_update/1`,

      formData,
      {
        reportProgress: true,
        observe:'events'
      }
    )
  }
  getBannerImage():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}banner_image_index`)
  }
  updateBannerImage(
    services_banner_image: File,
    services_detail_banner_image: File,
    say_hello_banner_image: File,
    feedback_banner_image: File,
    contact_banner_image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('services_banner_image',services_banner_image);
    formData.append('services_detail_banner_image',services_detail_banner_image);
    formData.append('say_hello_banner_image',say_hello_banner_image);
    formData.append('feedback_banner_image',feedback_banner_image);
    formData.append('contact_banner_image',contact_banner_image);
    return this._HttpClient.post(`${environment.apiUrl}banner_image_update/1`,

      formData,
      {
        reportProgress: true,
        observe:'events'
      }
    )
  }
}
