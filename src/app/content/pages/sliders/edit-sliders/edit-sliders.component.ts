import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-edit-sliders',
  templateUrl: './edit-sliders.component.html',
  styleUrls: ['./edit-sliders.component.scss']
})
export class EditSlidersComponent implements OnInit {


  success: any = '';
  error: any = '';
  modal: any;
  slider:any;
  indexForNumbers: any;
  sliderImage ='https://digitalbondmena.com/sliders/'

  constructor(
    private _SliderService:SliderService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._SliderService.getSliderDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.slider = response.row
      }
    )
  }
  updateSlider = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    image : new FormControl(null),
})
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateSlider.patchValue({
      image: file
    })
    this.updateSlider.get('image')?.updateValueAndValidity()
  }




  onUpdate(){
    this._SliderService.updateSlider(
      this.indexForNumbers,
      this.updateSlider.value.en_title,
      this.updateSlider.value.ar_title,
      this.updateSlider.value.en_text,
      this.updateSlider.value.ar_text,
      this.updateSlider.value.image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/sliders']);
          }, 3000);
        }
      }
      , error => {
        if (error.status === 422) {
          this.error = error.error.message
        }
      }
    )
  }

}
