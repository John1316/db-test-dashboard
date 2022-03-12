import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  home:any;
  imageUrl='https://digitalbondmena.com/home_page/';
  fullscreed: boolean = false;
  loading: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed;
  }
  constructor(
    private _HomeService:HomeService
  ) { }

  ngOnInit(): void {
    this.showHome()
  }
  showHome(){
    this.loading = true
    this._HomeService.getHome().subscribe(
      (response) => {
        this.home = response.rows
        this.loading = false

      }
    )
  }

}
