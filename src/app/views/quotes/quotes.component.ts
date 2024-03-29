import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/hdlt';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes:Quote[] = [];
  displayedQuotes:Quote[] = [];

  search:string = '';

  constructor(private readonly hdlt:HDLTServices) { }

  async ngOnInit(): Promise<void> {
    this.quotes = await this.hdlt.getQuotes();
    this.displayedQuotes = [...this.quotes];
  }

  searchIntoQuotes(search:any):void {
    if(search === '') this.displayedQuotes = [...this.quotes];
    else this.displayedQuotes = (this.hdlt.searchIntoObjectFields(this.quotes, search) as Quote[]);
  }
}
