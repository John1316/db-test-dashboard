import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-edit-banners',
  templateUrl: './edit-banners.component.html',
  styleUrls: ['./edit-banners.component.scss']
})
export class EditBannersComponent implements OnInit {

  error:string = '';
  success:string = '';
  shortLink: string = "";
  imageUrl= 'https://digitalbondmena.com/banner_images/'
  bannerImageEdit!:FormGroup;
  bannerImageData:any;
  constructor(
    private _HomeService:HomeService,
    private _FormBuilder:FormBuilder,
    private _Router:Router
  ) {
    this.bannerImageEdit = this._FormBuilder.group({

      services_banner_image: [null],
      services_detail_banner_image: [null],
      say_hello_banner_image: [null],
      feedback_banner_image: [null],
      contact_banner_image: [null]
    })
  }
  homeFormData(){
    this._HomeService.getBannerImage().subscribe(
      (response) => {
        this.bannerImageData = response.rows
      }
    )
  }
  ngOnInit(): void {
    this.homeFormData()
  }
  services_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.bannerImageEdit.patchValue({
      services_banner_image: file
    })
    this.bannerImageEdit.get('services_banner_image')?.updateValueAndValidity()
  }
  services_detail_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.bannerImageEdit.patchValue({
      services_detail_banner_image: file
    })
    this.bannerImageEdit.get('services_detail_banner_image')?.updateValueAndValidity()
  }
  say_hello_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.bannerImageEdit.patchValue({
      say_hello_banner_image: file
    })
    this.bannerImageEdit.get('say_hello_banner_image')?.updateValueAndValidity()
  }
  feedback_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.bannerImageEdit.patchValue({
      feedback_banner_image: file
    })
    this.bannerImageEdit.get('feedback_banner_image')?.updateValueAndValidity()
  }
  contact_banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.bannerImageEdit.patchValue({
      contact_banner_image: file
    })
    this.bannerImageEdit.get('contact_banner_image')?.updateValueAndValidity()
  }


  onSubmit(){
    this._HomeService.updateBannerImage(
      this.bannerImageEdit.value.contact_banner_image,
      this.bannerImageEdit.value.feedback_banner_image,
      this.bannerImageEdit.value.say_hello_banner_image,
      this.bannerImageEdit.value.services_banner_image,
      this.bannerImageEdit.value.services_detail_banner_image,
    ).subscribe(
      (response) => {
            this.success = response.body.success
            setTimeout(() => {
              this._Router.navigate(['/banners']);
            }, 3000);
      }, error => {
          this.error = error.error.error
          console.log(error);
      }
    )

  }

}
