import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { AuthentificationService } from 'src/app/services/auth.services';
import { HDLTServices } from 'src/app/services/hdlt.services';
import { ModalService } from '../../services/modal.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.scss'],
})
export class OngoingComponent implements OnInit {
  ongoing: Status[] = [];

  constructor(
    private hdlt: HDLTServices,
    private auth: AuthentificationService,
    private readonly modalService: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.auth.CheckConnection();
    this.ongoing = await this.hdlt.GetOnGoingStatus();
    //sort by date
    this.ongoing.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  async Payed(status: Status) {
    this.modalService
      .openConfirmModal({
        title: 'Validation de tournée !',
        message: `C'est pas un missclick ? c'est bien payé ?`,
        cancelText: 'Oups',
        confirmText: 'Oui',
      })
      .pipe(take(1))
      .subscribe(async (payload) => {
        if (payload.success) {
          let res = await this.hdlt.CompleteStatus(status.id);
          if (res.type == ResponseType.Success) {
            //remove from list
            this.ongoing = this.ongoing.filter((x) => x.id != status.id);
          }
        }
      });
  }

  IsUserStatus(status: Status) {
    let username = this.auth.GetUserName();
    return status.username == username;
  }
}
