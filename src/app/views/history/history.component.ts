import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
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

  constructor(private hdlt:HDLTServices) { }

  async ngOnInit(): Promise<void> {
    this.GlobalHistory = await this.hdlt.GetAllStatus();
    //find all users with no duplicates
    this.users = this.GlobalHistory.map(x => x.username).filter((value, index, self) => self.indexOf(value) === index);
    //create a dictionary with username as key and all his status as value
    this.users.forEach(user => {
      this.history[user] = this.GlobalHistory.filter(x => x.username == user);
    });

    //sort user by number of status
    this.users.sort((a,b) => this.history[b].length - this.history[a].length);
  }

}
