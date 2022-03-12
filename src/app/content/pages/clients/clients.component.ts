import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService , BsModalRef} from 'ngx-bootstrap/modal';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  pageName: string = 'Clients'
  success: string = '';
  error: string = '';
  delete: string = '';
  clients: any[] =[];
  modalRef!: BsModalRef;

  clientImage ='https://digitalbondmena.com/clients/';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  currentPage = 1;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _ClientsService:ClientsService,

    public modalService: BsModalService  ) { }

  ngOnInit(): void {
    this.showClients()
  }

  createClient = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    type : new FormControl('', Validators.required),
    logo : new FormControl(null, Validators.required),
  })

  logo(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createClient.patchValue({
      logo: file
    })
    this.createClient.get('logo')?.updateValueAndValidity()
  }
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
  showClients(){
    this.loading = true
    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clients = response.rows
        this.loading = false
      }
    )
  }

  onDelete(id:number , data:any){
    this.loadingAction = true
    this._ClientsService.deleteClient(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          this.error = '';
          this.success = '';
          this.loadingAction = false

          this.showClients();
        }
      }
    )
  }
  onCreate(){
      this.loadingAction = true

    this._ClientsService.CreateClient(
      this.createClient.value.en_title,
      this.createClient.value.ar_title,
      this.createClient.value.en_text,
      this.createClient.value.ar_text,
      this.createClient.value.type,
      this.createClient.value.logo,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showClients()
          this.modalRef.hide()
          this.loadingAction = false

          this.createClient.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
