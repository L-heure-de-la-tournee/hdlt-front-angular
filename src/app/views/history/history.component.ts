import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
import { AchivementsServices } from 'src/app/services/achievements.services';
import { AuthentificationService } from 'src/app/services/auth.services';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  GlobalHistory:Status[] = [];
  users:string[] = [];
  history:{[key:string]:Status[]} = {};

  constructor(private hdlt:HDLTServices,private auth:AuthentificationService,private ach:AchivementsServices) { }

  async ngOnInit(): Promise<void> {
    this.GlobalHistory = await this.hdlt.GetAllStatus();
    console.log("history",this.GlobalHistory)
    this.ach.SetupComparisonData(this.GlobalHistory);
    //find all users with no duplicates
    this.users = this.GlobalHistory.map(x => x.username).filter((value, index, self) => self.indexOf(value) === index);
    //create a dictionary with username as key and all his status as value
    this.users.forEach(user => {
      let status= this.GlobalHistory.filter(x => x.username == user);
      //sort status by date
      status.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.history[user] = status;
    });

    //sort user by number of status
    this.users.sort((a,b) => this.history[b].length - this.history[a].length);
    //put current user at the top
    this.users.unshift(this.users.splice(this.users.indexOf(this.auth.GetUserName()),1)[0]);
  }

}
