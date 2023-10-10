import { Component, Input } from '@angular/core';
import { Quote, Reaction } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent {
  @Input() quote!: Quote;

  constructor(private readonly hdlt: HDLTServices) {}

  async onReactionSelected(reaction: string) {
    let res = await this.hdlt.reactToQuote(this.quote, reaction);
    if (res.type === ResponseType.Success) {
      this.quote.reactions = this.quote.reactions.filter((r) => !r.isMine);
      this.quote.reactions.push({
        id: res.value,
        emoji: reaction,
        isMine: true,
      });
    }
  }

  async onRemoveReaction(reaction: Reaction) {
    //if the reaction is mine, remove it
    if (reaction.isMine) {
      let res = await this.hdlt.removeReaction(this.quote);
      if (res.type === ResponseType.Success) {
        this.quote.reactions = this.quote.reactions.filter((r) => !r.isMine);
      }
    }
  }
}
