import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isFullScreen!: boolean;
  elem: any;
  isLogined: boolean = false;
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

  //   let elem:any = document.documentElement;
  //   let methodToBeInvoked = elem.requestFullscreen ||
  //   elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
  //   ||
  //   elem['msRequestFullscreen'];
  //   if (methodToBeInvoked){
  //     methodToBeInvoked.call(elem)
  //   }else{
  //     return elem;
  //   }
  // }
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _AuthService: AuthService
  ) {
    _AuthService.currentUserData.subscribe(() => {
      if (_AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;

        // console.log(this._AuthService);
        // this.firstName = this._AuthService.currentUserData.value.first_name;
        // console.log(this.firstName);
      } else {
        this.isLogined = true;
      }
    });
  }
  ngOnInit(): void {
    this.elem = document.documentElement;
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
