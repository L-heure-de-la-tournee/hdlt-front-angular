import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Quote, Reaction, SmallReaction } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent implements OnChanges {
  @Input() quote!: Quote;

  constructor(private readonly hdlt: HDLTServices) {}

  differentReactions: SmallReaction[] = [];

  userHasReacted?: string;

  updateReactions() {
    const emojiCounts = this.quote.reactions.reduce((acc, reaction) => {
      const { emoji } = reaction;
      acc[emoji] = (acc[emoji] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.differentReactions = Object.keys(emojiCounts).map((emoji) => ({
      emoji,
      count: emojiCounts[emoji],
    }));

    console.log(this.differentReactions);
    this.userHasReacted = this.quote.reactions.find((r) => r.isMine)?.emoji;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quote']) {
      this.updateReactions();
    }
  }

  async onReactionSelected(reaction: string) {
    let res = await this.hdlt.reactToQuote(this.quote, reaction);
    if (res.type === ResponseType.Success) {
      this.quote.reactions = this.quote.reactions.filter((r) => !r.isMine);
      this.quote.reactions.push({
        id: res.value,
        emoji: reaction,
        isMine: true,
      });
      this.updateReactions();
    }
  }

  async onRemoveReaction() {
    //if the reaction is mine, remove it
    if (this.userHasReacted) {
      let res = await this.hdlt.removeReaction(this.quote);
      if (res.type === ResponseType.Success) {
        this.quote.reactions = this.quote.reactions.filter((r) => !r.isMine);
      }
      this.updateReactions();
    }
  }
}
