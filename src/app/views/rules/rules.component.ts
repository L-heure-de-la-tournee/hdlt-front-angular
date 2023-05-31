import { Component, OnInit } from '@angular/core';
import { StatusType } from 'src/app/models/hdlt';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  status:StatusType[]=[]

  constructor(private hdlt:HDLTServices ) { }

  async ngOnInit(){
    this.status = await this.hdlt.GetStatusTypes();
  }



}
