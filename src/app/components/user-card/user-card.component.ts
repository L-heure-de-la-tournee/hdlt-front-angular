import { Component, Input } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() username!:string;
  @Input() status!:Status[];

  constructor(private hdlt:HDLTServices) { }

}
