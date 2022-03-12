import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {
  error:string = '';
  success:string = '';
  shortLink: string = "";
  homeLink= 'https://digitalbondmena.com/home_page/'
  homeEdit!:FormGroup;
  homeData:any;
  constructor(
    private _HomeService:HomeService,
    private _FormBuilder:FormBuilder,
    private _Router:Router
  ) {
    this.homeEdit = this._FormBuilder.group({
      en_about_home_title: [''],
      ar_about_home_title: [''],
      en_about_home_text: [''],
      ar_about_home_text: [''],
      en_first_icon_title: [''],
      ar_first_icon_title: [''],
      en_second_icon_title: [''],
      ar_second_icon_title: [''],
      en_third_icon_title: [''],
      ar_third_icon_title: [''],
      en_fourth_icon_title: [''],
      ar_fourth_icon_title: [''],
      first_icon: [null],
      second_icon: [null],
      third_icon: [null],
      fourth_icon: [null]
    })
  }
  homeFormData(){
    this._HomeService.getHome().subscribe(
      (response) => {
        this.homeData = response.rows
      }
    )
  }
  ngOnInit(): void {
    this.homeFormData()
  }
  onChangeFile1(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.homeEdit.patchValue({
      first_icon: file
    })
    this.homeEdit.get('first_icon')?.updateValueAndValidity()
  }
  onChangeFile2(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.homeEdit.patchValue({
      second_icon: file
    })
    this.homeEdit.get('second_icon')?.updateValueAndValidity()
  }
  onChangeFile3(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.homeEdit.patchValue({
      third_icon: file
    })
    this.homeEdit.get('third_icon')?.updateValueAndValidity()
  }
  fourthImageChange(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.homeEdit.patchValue({
      fourth_icon: file
    })
    this.homeEdit.get('fourth_icon')?.updateValueAndValidity()
  }


  onSubmit(){
    this._HomeService.updateHome(
      this.homeEdit.value.en_about_home_title,
      this.homeEdit.value.ar_about_home_title,
      this.homeEdit.value.en_about_home_text,
      this.homeEdit.value.ar_about_home_text,
      this.homeEdit.value.en_first_icon_title,
      this.homeEdit.value.ar_first_icon_title,
      this.homeEdit.value.ar_second_icon_title,
      this.homeEdit.value.en_second_icon_title,
      this.homeEdit.value.ar_third_icon_title,
      this.homeEdit.value.en_third_icon_title,
      this.homeEdit.value.ar_fourth_icon_title,
      this.homeEdit.value.en_fourth_icon_title,
      this.homeEdit.value.first_icon,
      this.homeEdit.value.second_icon,
      this.homeEdit.value.third_icon,
      this.homeEdit.value.fourth_icon

    ).subscribe(
      (response) => {
            this.success = response.body.success
            setTimeout(() => {
              this._Router.navigate(['/home-page']);
            }, 3000);
      }, error => {
          this.error = error.error.error
          console.log(error);
      }
    )

  }

}
