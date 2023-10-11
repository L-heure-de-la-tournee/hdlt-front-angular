import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HDLTServices } from './services/hdlt.services';
import { AchivementsServices } from './services/achievements.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hdlt';

  constructor(
    private router: Router,
    private hdlt: HDLTServices,
    private ach: AchivementsServices
  ) {}

  async ngOnInit(): Promise<void> {
    let allstatus = await this.hdlt.GetAllStatus();
    await this.ach.SetupComparisonData(allstatus);
    this.router.navigate(['/home']);
  }
}
