import { Component, Input } from '@angular/core';
import { Achievement } from 'src/app/models/hdlt';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent {

  @Input() achievement!:Achievement;

  constructor() { }

  

}
