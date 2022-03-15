import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  pageName:string='Teams'
  teams: any[] =[];
  success: string ='';
  error: string ='';
  delete: string ='';
    modalRef!:BsModalRef;
    loading: boolean = false;
    loadingAction: boolean = false;
  teamImage ='https://digitalbondmena.com/teams/'
  fullscreed: boolean = false;
  currentPage = 1
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _TeamService:TeamService,
        private modalService:BsModalService,
        private _Title:Title

  ) { }
    openModal(template:any){

      this.modalRef = this.modalService.show(template);
    }

  showTeams(){
    this.loading = true
    this._TeamService.getTeams().subscribe(
      (response) => {
        this.teams = response.rows
        this.loading = false
      }
    )
  }

  createTeam = new FormGroup({
    en_name : new FormControl('', Validators.required),
    ar_name : new FormControl('', Validators.required),
    en_role : new FormControl('', Validators.required),
    ar_role : new FormControl('', Validators.required),
    facebook : new FormControl('', Validators.required),
    instagram : new FormControl('', Validators.required),
    twitter : new FormControl('', Validators.required),
    image : new FormControl('', Validators.required),
  })

  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createTeam.patchValue({
      image: file
    })
    this.createTeam.get('image')?.updateValueAndValidity()
  }

  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete team with id ${id}`)) {
      this.loadingAction = true
      this._TeamService.deleteTeam(id,data ).subscribe(
        (response) => {
          if (response.success) {
            this.delete = response.success
            this.error = ''
            this.success = ''
            this.showTeams();
            this.loadingAction = false

          }
        }
      )
    }
  }
  onCreate(){
    this.loadingAction = true
    this._TeamService.CreateTeam(
      this.createTeam.value.en_name,
      this.createTeam.value.ar_name,
      this.createTeam.value.en_role,
      this.createTeam.value.ar_role,
      this.createTeam.value.facebook,
      this.createTeam.value.instagram,
      this.createTeam.value.twitter,
      this.createTeam.value.image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showTeams();
          this.modalRef.hide();
          this.loadingAction = false
          this.createTeam.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  ngOnInit(): void {
    this.showTeams()
    this._Title.setTitle(`Digital Bond | Teams`)
  }

}
