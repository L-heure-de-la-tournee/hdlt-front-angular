import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusType } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent {

  quoteForm!:FormGroup;
  types: StatusType[] = [];

  constructor(private formBuilder: FormBuilder,private router:Router,private hdlt:HDLTServices) { }

  async ngOnInit(): Promise<void> {
    this.quoteForm = this.formBuilder.group({
      quote: [null,[Validators.required]],
      username: [null,[Validators.required,Validators.maxLength(200),Validators.minLength(3)]],
      date: [null,[Validators.required]]
    });
    this.types = await this.hdlt.GetStatusTypes();
    this.quoteForm.patchValue({type:this.types[0].id});
  }

  async onSubmitForm(): Promise<void> {

    let response = await this.hdlt.createQuote(this.quoteForm.value)

    if(response.type == ResponseType.Success){
      this.router.navigate(['/ongoing']);
    }

  }



}
