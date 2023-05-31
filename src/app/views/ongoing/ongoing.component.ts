import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
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
  }


}
