import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasestudyService } from 'src/app/services/casestudy.service';
@Component({
  selector: 'app-edit-casestudy',
  templateUrl: './edit-casestudy.component.html',
  styleUrls: ['./edit-casestudy.component.scss']
})
export class EditCasestudyComponent implements OnInit {

  success: any = '';
  error: any = '';
  modal: any;
  caseStudy:any;
  indexForNumbers: any;
  caseStudyImage ='https://digitalbondmena.com/case-study/'

  constructor(
    private _CasestudyService:CasestudyService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._CasestudyService.getCaseStudyDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.caseStudy = response.caseStudyData[0]
      }
    )
  }
  updateCaseStudy = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    image : new FormControl(null),
    banner_image : new FormControl(null)
})
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateCaseStudy.patchValue({
      image: file
    })
    this.updateCaseStudy.get('image')?.updateValueAndValidity()
  }
  banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateCaseStudy.patchValue({
      banner_image: file
    })
    this.updateCaseStudy.get('banner_image')?.updateValueAndValidity()
  }



  onUpdate(){
    this._CasestudyService.updateCaseStudy(
      this.indexForNumbers,
      this.updateCaseStudy.value.en_title,
      this.updateCaseStudy.value.ar_title,
      this.updateCaseStudy.value.en_text,
      this.updateCaseStudy.value.ar_text,
      this.updateCaseStudy.value.image,
      this.updateCaseStudy.value.banner_image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/case-study-model']);
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
