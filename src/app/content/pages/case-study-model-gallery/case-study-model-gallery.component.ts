import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-case-study-model-gallery',
  templateUrl: './case-study-model-gallery.component.html',
  styleUrls: ['./case-study-model-gallery.component.scss']
})
export class CaseStudyModelGalleryComponent implements OnInit {

  CaseStudyModelGallery: any[]=[];
  indexForNumbers!:number;
  indexCaseStudyId!:number;
  caseStudyImage:string='https://digitalbondmena.com/case_study_model_image/';
  modalRef!:BsModalRef;

  success: string = '';
  error: string = '';
  delete: string = '';
  fullscreed: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _CasestudyService:CasestudyService,
        private _BsModalService:BsModalService

  ) {
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

  }
  openModal(template:any){

    this.modalRef = this._BsModalService.show(template);
  }
  ngOnInit(): void {
    this.showCaseStudyModelImage()
  }
  showCaseStudyModelImage(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._CasestudyService.getCaseStudyModel(this.indexForNumbers).subscribe(
      (response) => {
        // console.log(response.caseStudyModels);
        this.CaseStudyModelGallery = response.caseStudyImages
        this.indexCaseStudyId = response.caseStudyImages[0].case_study_id;
        console.log(response);
      }
    )
  }
  createCaseStudyModelImage = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    case_id : new FormControl('', Validators.required),
    case_study_id : new FormControl('', Validators.required),
    image : new FormControl('', Validators.required)
  })
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createCaseStudyModelImage.patchValue({
      image: file
    })
    this.createCaseStudyModelImage.get('image')?.updateValueAndValidity()
  }
  onDelete(id:number , data:any){
    this._CasestudyService.deleteCaseStudyModelImage(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.showCaseStudyModelImage()
        }
      }
    )
  }
  onCreate(){
    this._CasestudyService.createCaseStudyModelImage(
      this.createCaseStudyModelImage.value.en_title,
      this.createCaseStudyModelImage.value.ar_title,
      this.createCaseStudyModelImage.value.image,
      this.createCaseStudyModelImage.value.case_study_id,
      this.createCaseStudyModelImage.value.case_id,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success;
          this.error = '';
          this.delete = '';
          this.showCaseStudyModelImage();
          this.modalRef.hide();
          this.createCaseStudyModelImage.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
