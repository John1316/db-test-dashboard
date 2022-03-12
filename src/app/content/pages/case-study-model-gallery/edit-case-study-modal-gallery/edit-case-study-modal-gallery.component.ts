import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-edit-case-study-modal-gallery',
  templateUrl: './edit-case-study-modal-gallery.component.html',
  styleUrls: ['./edit-case-study-modal-gallery.component.scss']
})
export class EditCaseStudyModalGalleryComponent implements OnInit {

  success: any = '';
  error: any = '';
  modal: any;
  caseStudyModelImages:any;
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

    this._CasestudyService.getCaseStudyModelImageSingledata(this.indexForNumbers).subscribe(
      (response) => {
        this.caseStudyModelImages = response.row
      }
    )
  }
  updateCaseStudyImage = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),

    image : new FormControl(null),
})
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateCaseStudyImage.patchValue({
      image: file
    })
    this.updateCaseStudyImage.get('image')?.updateValueAndValidity()
  }




  onUpdate(){
    this._CasestudyService.updateCaseStudyModelImage(
      this.indexForNumbers,
      this.updateCaseStudyImage.value.en_title,
      this.updateCaseStudyImage.value.ar_title,
      this.updateCaseStudyImage.value.image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/case-studies']);
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
