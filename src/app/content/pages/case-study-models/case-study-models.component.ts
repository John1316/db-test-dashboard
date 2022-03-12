import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-case-study-models',
  templateUrl: './case-study-models.component.html',
  styleUrls: ['./case-study-models.component.scss']
})
export class CaseStudyModelsComponent implements OnInit {
  caseStudyModels: any[]=[];
  indexForNumbers!:number;
  caseStudyImage:string ='https://digitalbondmena.com/case-study/'
  success: string = '';
  error: string = '';
  delete: string = '';
  modalRef!:BsModalRef;
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
    this.showCaseStudyModel()
  }
  showCaseStudyModel(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._CasestudyService.getCaseStudyModel(this.indexForNumbers).subscribe(
      (response) => {
        // console.log(response.caseStudyModels);
        this.caseStudyModels = response.caseStudyModels
        console.log(response.caseStudyModels);
      }
    )
  }
  createCaseStudyModel = new FormGroup({

    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    case_id : new FormControl('', Validators.required),
  })
  onDelete(id:number , data:any){
    this._CasestudyService.deleteCaseStudyModel(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.showCaseStudyModel()

        }
      }
    )
  }
  onCreate(formData:FormGroup){
    this._CasestudyService.createCaseStudyModel(
      formData.value
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success;
          this.error = '';
          this.delete = '';
          this.modalRef.hide()
          this.showCaseStudyModel();
          this.createCaseStudyModel.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
}
