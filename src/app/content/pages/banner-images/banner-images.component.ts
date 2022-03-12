import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.scss']
})
export class BannerImagesComponent implements OnInit {

  banners:any;
  bannerUrl: string ='https://digitalbondmena.com/banner_images/';
  fullscreed: boolean = false;
  loading: boolean = false;

  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _HomeService:HomeService
  ) { }

  ngOnInit(): void {
    this.showBanners()
  }
  showBanners(){
    this.loading = true
    this._HomeService.getBannerImage().subscribe(
      (response) => {
        this.banners = response.rows
        this.loading = false
      }
    )
  }

}
