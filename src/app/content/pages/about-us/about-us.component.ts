import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {AboutService} from 'src/app/services/about.service'
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  AboutUs!: any;
  aboutUsImage:string = 'https://digitalbondmena.com/about_us_page/';
  fullscreed: boolean = false;
  loading: boolean = false;

  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _AboutService:AboutService,
    private _Title:Title
  ) { }


  showAboutus(){
    this.loading = true
    this._AboutService.getAboutUsTable().subscribe(
      (response) => {
        this.AboutUs = response.rows
        this.loading = false
      }
    )
  }

  ngOnInit(): void {
    this.showAboutus();
    this._Title.setTitle(`Digital Bond | About us`)

  }

}
