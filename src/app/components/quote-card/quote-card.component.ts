import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/hdlt';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent {
  @Input() quote!:Quote;
  
}
