import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLogined:boolean = false;
  constructor(
    private _AuthService:AuthService,
    private _Renderer2:Renderer2
  ) {
    _AuthService.currentUserData.subscribe(()=>{
      if (_AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;

      }
      else{
        this.isLogined = true;
      }
    })
  }
  navOpen(){
    let sidebarOverlay = document.querySelector('.sidenav-overlay')
    this._Renderer2.addClass(document.body,'menu-hide')
    this._Renderer2.removeClass(document.body,'menu-open')
    this._Renderer2.removeClass(sidebarOverlay,'d-block')

  }
  ngOnInit(): void {
  }

}
