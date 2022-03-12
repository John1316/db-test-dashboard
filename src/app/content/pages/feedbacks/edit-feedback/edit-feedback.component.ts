import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.scss']
})
export class EditFeedbackComponent implements OnInit {

  success: any = '';
  error: any = '';
  modal: any;
  feedback:any;
  indexForNumbers: any;
  feedbackImage ='https://digitalbondmena.com/feedbacks/'

  constructor(
    private _FeedbacksService:FeedbacksService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._FeedbacksService.getFeedbackDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.feedback = response.feedback
      }
    )
  }
  updateFeedback = new FormGroup({
    en_name : new FormControl('', Validators.required),
    ar_name : new FormControl('', Validators.required),
    en_role : new FormControl('', Validators.required),
    ar_role : new FormControl('', Validators.required),
    en_feedback : new FormControl('', Validators.required),
    ar_feedback : new FormControl('', Validators.required),
    status : new FormControl('', Validators.required),
    image : new FormControl(null),
})
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateFeedback.patchValue({
      image: file
    })
    this.updateFeedback.get('image')?.updateValueAndValidity()
  }



  onUpdate(){
    this._FeedbacksService.updateFeedback(
      this.indexForNumbers,
      this.updateFeedback.value.en_name,
      this.updateFeedback.value.ar_name,
      this.updateFeedback.value.en_role,
      this.updateFeedback.value.ar_role,
      this.updateFeedback.value.en_feedback,
      this.updateFeedback.value.ar_feedback,
      this.updateFeedback.value.status,
      this.updateFeedback.value.image

    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/feedbacks']);
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
