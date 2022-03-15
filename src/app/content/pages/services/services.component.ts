import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators , FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  services: any[] =[];
  modalRef!:BsModalRef;
  pageName: string ='Services';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  page!:number;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  serviceImage ='https://digitalbondmena.com/services/'
  constructor(
    private _ServiceService:ServiceService,
    private modalService:BsModalService,
    private _Title:Title
  ) { }
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.showServices()
    this._Title.setTitle(`Digital Bond | Services`)

  }

  createService = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    icon : new FormControl(null, Validators.required),
    image : new FormControl(null, Validators.required),
    banner_image : new FormControl(null, Validators.required),
  })

  icon(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      icon: file
    })
    this.createService.get('icon')?.updateValueAndValidity()
  }
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      image: file
    })
    this.createService.get('image')?.updateValueAndValidity()
  }
  banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      banner_image: file
    })
    this.createService.get('banner_image')?.updateValueAndValidity()
  }
  showServices(){
    this.loading = true
    this._ServiceService.getServices().subscribe(
      (response) => {
        this.services = response.rows
        this.loading = false
      }
    )
  }
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete service with id ${id}`)) {
      this.loadingAction= true
      this._ServiceService.deleteService(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.loadingAction= false

          this.showServices();
        }
      }
      )
    }
  }
  onCreate(){
    this.loadingAction= true

    this._ServiceService.CreateService(
      this.createService.value.en_title,
      this.createService.value.ar_title,
      this.createService.value.en_text,
      this.createService.value.ar_text,
      this.createService.value.icon,
      this.createService.value.image,
      this.createService.value.banner_image,

    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.modalRef.hide()
          this.showServices();
          this.loadingAction= false;

          this.createService.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
