import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  loading: boolean = false;
  caseStudyStatistics!:number;
  clientsStatistics!:number;
  feedbacksStatistics!:number;
  clientMessages: any[] =[];
  page!:number;
  modalRef!:BsModalRef;
  constructor(
    private _ClientsService:ClientsService,
    private _FeedbacksService:FeedbacksService,
    private _CasestudyService:CasestudyService,
    private _Title:Title
  ) { }
  showClientMessage(){
    this.loading = true;

    this._FeedbacksService.getClientMessages().subscribe(
      (response) => {
        this.clientMessages = response.rows;
        this.loading= false;

      }
    )

  }
  showClientsLength(){
    this.loading = true;

    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clientsStatistics = response.rows.length
        this.loading = false
      }
    )
  }
  showCaseStudyLength(){
    this.loading = true;

    this._CasestudyService.getCaseStudy().subscribe(
      (response) => {
        this.caseStudyStatistics = response.rows.length;
        this.loading = false

      }
    )
  }


  showFeedbacksLength(){
    this.loading = true;

    this._FeedbacksService.getFeedbacks().subscribe(
      (response) => {
        
        this.feedbacksStatistics = response.rows.length;
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
    this.showClientMessage();
    this.showClientsLength();
    this.showCaseStudyLength();
    this.showFeedbacksLength();
    // setInterval(()=>{
    //   this.showClientMessage()
    // }, 10000)
    // setTimeout(() => {
    //   this.loading = true
    // }, 3000);
    this._Title.setTitle(`Digital Bond | Home`)
  }
}
