import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseType } from 'src/app/models/responses';
import { AuthentificationService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email!:string;
  username:string = "";

  constructor(private auth:AuthentificationService,private router:Router) {}

  async ngOnInit() {
    await this.auth.CheckConnection();
    this.username = this.auth.GetUserName()
    this.email = this.auth.GetUserEmail();

  }

  async logout(){
    let response = await this.auth.Logout();
    if(response.type == ResponseType.Success){
      this.router.navigate(["/home"]);
    }
  }

  async UpdateName(){
    console.log("updating name",this.username)
    await this.auth.UpdateName(this.username);
  }






}
