import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasestudyService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCaseStudy(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}case_study_index`)
  }
  getCaseStudyDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}caseStudysingledata/${id}`)
  }
  createCaseStudy(
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,
    banner_image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    formData.append('banner_image',banner_image);
    return this._HttpClient.post(`${environment.apiUrl}case_study_store` , formData)
  }
  updateCaseStudy(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,
    banner_image: File,



  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    formData.append('banner_image',banner_image);
    return this._HttpClient.post(`${environment.apiUrl}case_study_update/${id}` , formData)
  }
  deleteClient(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_destroy/${id}` , formData)
  }
  // case study model

  getCaseStudyModel(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}caseStudyModels/${id}`)
  }
  getCaseStudyModelSingledata(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}case_study_model_data/${id}`)
  }
  deleteCaseStudyModel(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_model_destroy/${id}` , formData)
  }
  createCaseStudyModel(formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_model_store` , formData)
  }
  updateCaseStudyModel( id:number , formData:any ) :Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_model_update/${id}` , formData)

  }
  // case study model image
  getCaseStudyModelImageSingledata(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}case_study_model_image_data/${id}`)
  }
  deleteCaseStudyModelImage(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_model_images_destroy/${id}` , formData)
  }
  createCaseStudyModelImage(
    en_title: any,
    ar_title: any,
    case_id:any,
    case_study_id:any,
    image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('case_id',case_id);
    formData.append('case_study_id',case_study_id);

    formData.append('image',image);

    return this._HttpClient.post(`${environment.apiUrl}case_study_model_images_store` , formData)
  }
  updateCaseStudyModelImage(
    id:number ,
    en_title: any,
    ar_title: any,

    image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);


    formData.append('image',image);
    
    return this._HttpClient.post(`${environment.apiUrl}case_study_model_update/${id}` , formData)

  }
}
