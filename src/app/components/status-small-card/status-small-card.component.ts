import { Component, Input } from '@angular/core';
import { Status } from 'src/app/models/hdlt';

@Component({
  selector: 'app-status-small-card',
  templateUrl: './status-small-card.component.html',
  styleUrls: ['./status-small-card.component.scss']
})
export class StatusSmallCardComponent {
  @Input() status!:Status;
  showName:boolean = false;

  constructor() { }

  ToggleName(){
    this.showName = !this.showName;
  }

}
