import { Injectable } from '@angular/core';
import { Client, Account, ID, Databases } from "appwrite";
import { environment } from 'src/environments/environment';
import { getErrorMessage } from '../Utils/utils';
import { ResponseType, Response } from '../models/responses';
import { ToastService } from './toast.services';
import { AuthentificationService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class HDLTServices {  

    client!:Client;
    account!:Account;
    session!:any;
    isConnected!:boolean;
    databases!:Databases;

    constructor(private toast : ToastService, private auth: AuthentificationService) {
        this.isConnected=false;
        this.client = new Client();
        this.client
        .setEndpoint(environment.API_URL) // Your API Endpoint
        .setProject(environment.PROJECT_ID) // Your project ID
        ;
        this.databases = new Databases(this.client);
    }

    async GetStatusTypes(): Promise<string[]>{
        let types:string[] = [];
        try{
            let response = await this.databases.listDocuments(environment.DATABASE_ID, environment.STATUS_TYPE);
            response.documents.forEach((document:any) => {
                types.push(document.name);
            }
            );
            console.log(types);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        return types;
    }


   
}