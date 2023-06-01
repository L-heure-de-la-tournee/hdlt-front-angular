import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusType } from 'src/app/models/hdlt';
import { ResponseType } from 'src/app/models/responses';
import { HDLTServices } from 'src/app/services/hdlt.services';

@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.component.html',
  styleUrls: ['./new-status.component.scss']
})
export class NewStatusComponent implements OnInit{
  statusForm!:FormGroup;
  types: StatusType[] = [];

  constructor(private formBuilder: FormBuilder,private router:Router,private hdlt:HDLTServices) { }

  async ngOnInit(): Promise<void> {
    this.statusForm = this.formBuilder.group({
      type: [null,[Validators.required]],
      name: [null,[Validators.required,Validators.maxLength(200),Validators.minLength(3)]],
      date: [null,[Validators.required]]
    });
    this.types = await this.hdlt.GetStatusTypes();
    this.statusForm.patchValue({type:this.types[0].id});
  }

  async onSubmitForm(): Promise<void> {

    console.log(this.statusForm.value);
    let response = await this.hdlt.CreateStatus(this.statusForm.value)

    if(response.type == ResponseType.Success){
      this.router.navigate(['/ongoing']);
    }

  }



}
