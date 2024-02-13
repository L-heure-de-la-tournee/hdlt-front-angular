import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DEFAULT_MODAL_OPTIONS,
  ModalOptions,
} from '../../models/modal-options';
import { ModalPayload } from '../../models/modal-payload';

@Component({
  template: '',
})
export class BaseModalComponent {
  @Input() options: ModalOptions = DEFAULT_MODAL_OPTIONS;

  @Output() closeEvent = new EventEmitter<ModalPayload>();

  onClose(event: ModalPayload) {
    this.closeEvent.emit(event);
  }
}
