import { Component, Input, OnInit } from '@angular/core';
import { Achievement, Status } from 'src/app/models/hdlt';
import { AchivementsServices } from 'src/app/services/achievements.services';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() username!:string;
  @Input() status!:Status[];

  achievements!:Achievement[];
  hightlightedAchievements:Achievement|null = null;

  constructor(private hdlt:HDLTServices,private ach:AchivementsServices) { }

  async ngOnInit(): Promise<void> {
    this.achievements = await this.ach.GetAchievements(this.username);
    this.hightlightedAchievements = this.achievements[0];
  }



}
