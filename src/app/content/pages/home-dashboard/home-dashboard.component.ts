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
  loading: boolean = true;
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
    this._FeedbacksService.getClientMessages().subscribe(
      (response) => {
        this.clientMessages = response.rows;
        this.loading= false;

      }
    )

  }
  showClientsLength(){
    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clientsStatistics = response.rows.length
        this.loading = false
      }
    )
  }
  showCaseStudyLength(){

    this._CasestudyService.getCaseStudy().subscribe(
      (response) => {
        this.caseStudyStatistics = response.rows.length;
        this.loading = false

      }
    )
  }


  showFeedbacksLength(){

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
    this._Title.setTitle(`Digital Bond | Home`)
  }
}
