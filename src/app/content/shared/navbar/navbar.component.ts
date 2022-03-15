import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isFullScreen!: boolean;
  isLogined: boolean = false;
  isCollapsed:boolean = false;
  elem: any;
  username: any;

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event: any) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }

  // GoFullScreen(){


  constructor(
    @Inject(DOCUMENT) private document: any,
    private _AuthService: AuthService,
    public _Renderer2:Renderer2
  ) {
    _AuthService.currentUserData.subscribe(() => {
      if (_AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;
      } else {
        this.username = JSON.parse(
          sessionStorage.getItem('currentUsername') || '{}'
        );
        this.isLogined = true;
      }
    });

  }
  openMenu(){
    this._Renderer2.addClass(document.body,'menu-open')
    this._Renderer2.removeClass(document.body,'menu-expanded')
    this._Renderer2.removeClass(document.body,'menu-collapsed')


  }
  openSidebar(){
    this._Renderer2.addClass(document.body,'menu-expanded')
    this._Renderer2.removeClass(document.body,'menu-collapsed')
    this.isCollapsed = false
  }
  collpaseSidebar(){
    this._Renderer2.addClass(document.body,'menu-collapsed')
    this._Renderer2.removeClass(document.body,'menu-expanded')
    this.isCollapsed = true
  }
  ngOnInit(): void {
    this.elem = document.documentElement;
    this._Renderer2.addClass(document.body,'menu-expanded')

  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
  signOut() {
    this._AuthService.signOut();
  }
}
