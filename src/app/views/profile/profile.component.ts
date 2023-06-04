import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { AuthentificationService } from 'src/app/services/auth.services';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email!:string;
  username:string = "";
  verified=false;
  status!:Status[];

  constructor(private auth:AuthentificationService,private router:Router,private hdlt:HDLTServices) {}

  async ngOnInit() {
    await this.auth.CheckConnection();
    this.username = this.auth.GetUserName()
    this.email = this.auth.GetUserEmail();
    this.verified = this.auth.IsVerified();

    if(this.verified)
    {
      this.status = await this.hdlt.GetUserStatus(this.username);
      //sort status by date
      this.status.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  async logout(){
    let response = await this.auth.Logout();
    if(response.type == ResponseType.Success){
      this.router.navigate(["/home"]);
    }
  }

}
