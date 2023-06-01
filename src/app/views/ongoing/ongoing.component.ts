import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.scss']
})
export class OngoingComponent implements OnInit{

  ongoing:Status[] = [];

  constructor(private hdlt:HDLTServices) { }

  async ngOnInit(): Promise<void> {
    this.ongoing = await this.hdlt.GetOnGoingStatus();
    //sort by date
    this.ongoing.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  async Payed(status:Status){
    let valid = confirm("C'est pas un missclick ? c'est bien payé ?");
    if(!valid) return;

    let res = await this.hdlt.CompleteStatus(status.id);
    if(res.type == ResponseType.Success){
      //remove from list
      this.ongoing = this.ongoing.filter(x => x.id != status.id); 
    }
  }


}
