import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.scss']
})
export class EditTeamsComponent implements OnInit {

  success: any = '';
  error: any = '';
  modal: any;
  team:any;
  indexForNumbers: any;
  teamImage ='https://digitalbondmena.com/teams/'

  constructor(
    private _TeamService:TeamService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._TeamService.getTeamDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.team = response.feedback
      }
    )
  }
  updateTeam = new FormGroup({
    en_name : new FormControl('', Validators.required),
    ar_name : new FormControl('', Validators.required),
    en_role : new FormControl('', Validators.required),
    ar_role : new FormControl('', Validators.required),
    facebook : new FormControl('', Validators.required),
    instagram : new FormControl('', Validators.required),
    twitter : new FormControl('', Validators.required),
    image : new FormControl(null),
})
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateTeam.patchValue({
      image: file
    })
    this.updateTeam.get('image')?.updateValueAndValidity()
  }



  onUpdate(){
    this._TeamService.updateTeam(
      this.indexForNumbers,
      this.updateTeam.value.en_name,
      this.updateTeam.value.ar_name,
      this.updateTeam.value.en_role,
      this.updateTeam.value.ar_role,
      this.updateTeam.value.facebook,
      this.updateTeam.value.instagram,
      this.updateTeam.value.twitter,
      this.updateTeam.value.image

    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/teams']);
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
