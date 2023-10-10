import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reaction-picker',
  templateUrl: './reaction-picker.component.html',
  styleUrls: ['./reaction-picker.component.scss'],
})
export class ReactionPickerComponent {
  @Output() reactionSelected: EventEmitter<string> = new EventEmitter();

  showReactionOptions = false;

  options = ['👎', '👍', '😢', '😡', '😯', '😆', '❤️'];

  onSelectReaction(reaction: string) {
    this.reactionSelected.emit(reaction);
  }
}
