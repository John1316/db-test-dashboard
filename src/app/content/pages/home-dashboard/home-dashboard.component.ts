import { Component, OnInit } from '@angular/core';
import { CasestudyService } from 'src/app/services/casestudy.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  caseStudyStatistics!:number;
  clientsStatistics!:number;
  feedbacksStatistics!:number;
  loading: boolean = false;
  constructor(
    private _ClientsService:ClientsService,
    private _FeedbacksService:FeedbacksService,
    private _CasestudyService:CasestudyService
  ) { }

  showClientsLength(){
    this.loading = true
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
        this.caseStudyStatistics = response.rows.length
      }
    )
  }
  showFeedbacksLength(){
    this._FeedbacksService.getFeedbacks().subscribe(
      (response) => {
        this.feedbacksStatistics = response.rows.length
      }
    )
  }
  ngOnInit(): void {
    this.showClientsLength();
    this.showCaseStudyLength();
    this.showFeedbacksLength()
  }
}
