import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  //isConnected = false;
  //use AuthentificationService to get the current user
  phoneMenuOpen = false;
  constructor(private authService:AuthentificationService) {  }

  isConnected():boolean{
    return this.authService.isConnected;
  }

}
