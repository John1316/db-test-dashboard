import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-edit-case-study-model',
  templateUrl: './edit-case-study-model.component.html',
  styleUrls: ['./edit-case-study-model.component.scss']
})
export class EditCaseStudyModelComponent implements OnInit {


  success: any = '';
  error: any = '';
  modal: any;
  caseStudyModel:any;
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

    this._CasestudyService.getCaseStudyModelSingledata(this.indexForNumbers).subscribe(
      (response) => {
        this.caseStudyModel = response.row
      }
    )
  }
  updateCaseStudyModel = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required)
  })




  onUpdate(updateCaseStudyModel:FormGroup){
    this._CasestudyService.updateCaseStudyModel(
      this.indexForNumbers,
      updateCaseStudyModel.value
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          
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
