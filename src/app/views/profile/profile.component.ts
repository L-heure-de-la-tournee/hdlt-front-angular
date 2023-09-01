import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { AchivementsServices } from 'src/app/services/achievements.services';
import { AuthentificationService } from 'src/app/services/auth.services';
import { HDLTServices } from 'src/app/services/hdlt.services';
import { ToastService } from 'src/app/services/toast.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email!:string;
  username:string = "";
  oldUsername:string = "";
  verified=false;
  status!:Status[];

  oldPassword:string = "";
  newPassword:string = "";

  constructor(private auth:AuthentificationService,private router:Router,private hdlt:HDLTServices,private ach:AchivementsServices,private toast: ToastService) {}

  async ngOnInit() {
    await this.auth.CheckConnection();
    this.username = this.auth.GetUserName()
    this.oldUsername = this.username;
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

  async changeUsername(){
    if(this.username == ""){
      this.toast.Show("Please fill in the username",ResponseType.Error);
      return;
    }
    let response = await this.auth.UpdateName(this.username);
    if(response.type == ResponseType.Success){
      response = await this.hdlt.UpdateStatusWithNewUsername(this.oldUsername,this.username);
    }
  }

  async changePassword(){
    if(this.oldPassword == "" || this.newPassword == ""){
      this.toast.Show("Please fill in both current and new passwords",ResponseType.Error);
      return;
    }
    //if size is less than 8 characters warn the user
    if(this.newPassword.length < 8){
      this.toast.Show("Password must be at least 8 characters long",ResponseType.Error);
      return;
    }
    //if the password is the same as the old one warn the user
    if(this.oldPassword == this.newPassword){
      this.toast.Show("New password must be different from the old one",ResponseType.Error);
      return;
    }

    let response = await this.auth.UpdatePassword(this.oldPassword,this.newPassword);
  }
  

}
