import { Injectable } from '@angular/core';
import { Client, Account, ID, Databases } from "appwrite";
import { environment } from 'src/environments/environment';
import { getErrorMessage } from '../Utils/utils';
import { ResponseType, Response } from '../models/responses';
import { ToastService } from './toast.services';
import { AuthentificationService } from './auth.services';
import { Status, StatusType } from '../models/hdlt';

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

    async GetStatusTypes(): Promise<StatusType[]>{
        let types:StatusType[] = [];
        try{
            let response = await this.databases.listDocuments(environment.DATABASE_ID, environment.STATUS_TYPE);
            response.documents.forEach((document:any) => {
                let type = {id: document.$id, name: document.name}
                types.push(type);
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

    async CreateStatus(status:Status): Promise<Response>{
        let res:Response;

        try{
            let statusToUpload = {	
                statusType: status.type,
                name: status.name,
                date: status.date
            };
            await this.databases.createDocument(environment.DATABASE_ID, environment.STATUS, ID.unique(), statusToUpload);
            res = {type: ResponseType.Success, value: "Status created"};
        }
        catch(error){
            res = {type: ResponseType.Error, value: getErrorMessage(error)};
        }
        this.toast.Show(res.value, res.type);
        return res;
    }

    async CompleteStatus(statusId:string): Promise<Response>{
        let res:Response;

        try{
            let statusToUpload = {	
                completed: true
            };
            await this.databases.updateDocument(environment.DATABASE_ID, environment.STATUS, statusId, statusToUpload);
            res = {type: ResponseType.Success, value: "Status completed"};
        }
        catch(error){
            res = {type: ResponseType.Error, value: getErrorMessage(error)};
        }
        this.toast.Show(res.value, res.type);
        return res;
    }


   
}