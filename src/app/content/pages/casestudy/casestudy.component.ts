import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-casestudy',
  templateUrl: './casestudy.component.html',
  styleUrls: ['./casestudy.component.scss']
})
export class CasestudyComponent implements OnInit {
  pageName: string = 'Case studies'
  success: string = '';
  error: string = '';
  delete: string = '';
  caseStudies: any[] =[];
  modalRef!:BsModalRef;
  caseStudyImage ='https://digitalbondmena.com/case-study/';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _CasestudyService:CasestudyService,
    private _BsModalService:BsModalService
  ) { }

  ngOnInit(): void {
    this.showCaseStudy()
  }

  createCaseStudy = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    image : new FormControl(null, Validators.required),
    banner_image : new FormControl(null, Validators.required),
  })

  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createCaseStudy.patchValue({
      image: file
    })
    this.createCaseStudy.get('image')?.updateValueAndValidity()
  }
  banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createCaseStudy.patchValue({
      banner_image: file
    })
    this.createCaseStudy.get('banner_image')?.updateValueAndValidity()
  }
  openModal(template:any){

    this.modalRef = this._BsModalService.show(template);
  }
  showCaseStudy(){
    this.loading = true
    this._CasestudyService.getCaseStudy().subscribe(
      (response) => {
        this.caseStudies = response.rows
        this.loading = false

      }
    )
  }
  onDelete(id:number , data:any){
    this.loadingAction = true;

    this._CasestudyService.deleteClient(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          this.error = '';
          this.success = '';
          this.loadingAction = false;

          this.showCaseStudy();

        }
      }
    )
  }
  onCreate(){
    this.loadingAction = true;
    this._CasestudyService.createCaseStudy(
      this.createCaseStudy.value.en_title,
      this.createCaseStudy.value.ar_title,
      this.createCaseStudy.value.en_text,
      this.createCaseStudy.value.ar_text,
      this.createCaseStudy.value.image,
      this.createCaseStudy.value.banner_image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showCaseStudy();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createCaseStudy.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
}
