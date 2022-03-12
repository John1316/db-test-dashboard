import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  success: any = '';
  error: any = '';
  modal: any;
  client:any;
  indexForNumbers: any;
  clientImage ='https://digitalbondmena.com/clients/'

  constructor(
    private _ClientsService:ClientsService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._ClientsService.getClientDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.client = response.client
      }
    )
  }
  updateClients = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    type : new FormControl('', Validators.required),
    logo : new FormControl(null),
})
  logo(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateClients.patchValue({
      logo: file
    })
    this.updateClients.get('logo')?.updateValueAndValidity()
  }



  onUpdate(){
    this._ClientsService.updateClient(
      this.indexForNumbers,
      this.updateClients.value.en_title,
      this.updateClients.value.ar_title,
      this.updateClients.value.en_text,
      this.updateClients.value.ar_text,
      this.updateClients.value.type,
      this.updateClients.value.logo

    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          setTimeout(() => {
            this._Router.navigate(['/clients']);
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
