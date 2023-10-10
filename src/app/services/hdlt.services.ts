import { Injectable } from '@angular/core';
import { Client, Account, ID, Databases, Query, Functions } from 'appwrite';
import { environment } from 'src/environments/environment';
import { getErrorMessage } from '../Utils/utils';
import { ResponseType, Response } from '../models/responses';
import { ToastService } from './toast.services';
import { AuthentificationService } from './auth.services';
import { Quote, Status, StatusType } from '../models/hdlt';

@Injectable({
  providedIn: 'root',
})
export class HDLTServices {
  client!: Client;
  account!: Account;
  session!: any;
  isConnected!: boolean;
  databases!: Databases;
  functions!: Functions;

  constructor(
    private toast: ToastService,
    private auth: AuthentificationService
  ) {
    this.isConnected = false;
    this.client = new Client();
    this.client
      .setEndpoint(environment.API_URL) // Your API Endpoint
      .setProject(environment.PROJECT_ID); // Your project ID
    this.databases = new Databases(this.client);
    this.functions = new Functions(this.client);
  }

  async GetStatusTypes(): Promise<StatusType[]> {
    let types: StatusType[] = [];
    try {
      let response = await this.databases.listDocuments(
        environment.DATABASE_ID,
        environment.STATUS_TYPE,
        [Query.limit(100)]
      );
      let offset = response.documents.length;
      while (response.documents.length > 0) {
        response.documents.forEach((document: any) => {
          let type = { id: document.$id, name: document.name };
          types.push(type);
        });
        //only need to load for more if the response is full
        if (response.documents.length == 100) {
          response = await this.databases.listDocuments(
            environment.DATABASE_ID,
            environment.STATUS_TYPE,
            [Query.limit(100), Query.offset(offset)]
          );
          offset += response.documents.length;
        } else {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return types;
  }

  async CreateStatus(status: Status): Promise<Response> {
    let res: Response;

    try {
      let username = this.auth.GetUserName();
      let statusToUpload = {
        statusType: status.type,
        name: status.name,
        date: status.date,
        username: username,
      };
      await this.databases.createDocument(
        environment.DATABASE_ID,
        environment.STATUS,
        ID.unique(),
        statusToUpload
      );
      res = { type: ResponseType.Success, value: 'Status created' };
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
    }
    this.toast.Show(res.value, res.type);
    return res;
  }

  async CompleteStatus(statusId: string): Promise<Response> {
    let res: Response;

    try {
      let statusToUpload = {
        completed: true,
      };
      await this.databases.updateDocument(
        environment.DATABASE_ID,
        environment.STATUS,
        statusId,
        statusToUpload
      );
      res = { type: ResponseType.Success, value: 'Status completed' };
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
    }
    this.toast.Show(res.value, res.type);
    return res;
  }

  async GetOnGoingStatus(): Promise<Status[]> {
    let statuses: Status[] = [];
    try {
      let response = await this.databases.listDocuments(
        environment.DATABASE_ID,
        environment.STATUS,
        [Query.equal('completed', false), Query.limit(100)]
      );
      let offset = response.documents.length;
      while (response.documents.length > 0) {
        response.documents.forEach((document: any) => {
          let status = {
            id: document.$id,
            type: document.statusType.name,
            name: document.name,
            date: new Date(document.date),
            completed: document.completed,
            username: document.username,
          };
          statuses.push(status);
        });
        //only need to load for more if the response is full
        if (response.documents.length == 100) {
          response = await this.databases.listDocuments(
            environment.DATABASE_ID,
            environment.STATUS,
            [
              Query.equal('completed', false),
              Query.limit(100),
              Query.offset(offset),
            ]
          );
          offset += response.documents.length;
        } else {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return statuses;
  }

  async GetAllStatus(): Promise<Status[]> {
    let statuses: Status[] = [];
    try {
      // The only way is to loop through the database with the query Query.limit(100) and stop when the query result length == 0.
      let response = await this.databases.listDocuments(
        environment.DATABASE_ID,
        environment.STATUS,
        [Query.limit(100)]
      );
      let offset = response.documents.length;
      while (response.documents.length > 0) {
        response.documents.forEach((document: any) => {
          let status = {
            id: document.$id,
            type: document.statusType.name,
            name: document.name,
            date: new Date(document.date),
            completed: document.completed,
            username: document.username,
          };
          statuses.push(status);
        });
        //only need to load for more if the response is full
        if (response.documents.length == 100) {
          response = await this.databases.listDocuments(
            environment.DATABASE_ID,
            environment.STATUS,
            [Query.limit(100), Query.offset(offset)]
          );
          offset += response.documents.length;
        } else {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return statuses;
  }

  async GetUserStatus(username: string) {
    let statuses: Status[] = [];
    try {
      // The only way is to loop through the database with the query Query.limit(100) and stop when the query result length == 0.
      let response = await this.databases.listDocuments(
        environment.DATABASE_ID,
        environment.STATUS,
        [Query.equal('username', username), Query.limit(100)]
      );
      let offset = response.documents.length;
      while (response.documents.length > 0) {
        response.documents.forEach((document: any) => {
          let status = {
            id: document.$id,
            type: document.statusType.name,
            name: document.name,
            date: new Date(document.date),
            completed: document.completed,
            username: document.username,
          };
          statuses.push(status);
        });
        //only need to load for more if the response is full
        if (response.documents.length == 100) {
          response = await this.databases.listDocuments(
            environment.DATABASE_ID,
            environment.STATUS,
            [
              Query.equal('username', username),
              Query.limit(100),
              Query.offset(offset),
            ]
          );
          offset += response.documents.length;
        } else {
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return statuses;
  }

  async UpdateStatusWithNewUsername(
    oldUsername: string,
    newUsername: string
  ): Promise<Response> {
    let res: Response;

    try {
      let statusToUpload = {
        username: newUsername,
      };
      //get all the status of the old username
      let statuses = await this.GetUserStatus(oldUsername);
      //update all the status with the new username
      statuses.forEach(async (status: Status) => {
        await this.databases.updateDocument(
          environment.DATABASE_ID,
          environment.STATUS,
          status.id,
          statusToUpload
        );
      });
      res = { type: ResponseType.Success, value: 'Status updated' };
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
    }
    this.toast.Show(res.value, res.type);
    return res;
  }

  async createQuote(quote: Quote): Promise<Response> {
    let res: Response;

    try {
      const id = ID.unique();
      await this.databases.createDocument(
        environment.DATABASE_ID,
        environment.QUOTE,
        ID.unique(),
        quote
      );
      res = { type: ResponseType.Success, value: 'Quote added' };
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
    }

    this.toast.Show(res.value, res.type);
    return res;
  }

  async getQuotes(): Promise<Quote[]> {
    let quotes: Quote[] = [];

    try {
      let response = await this.databases.listDocuments(
        environment.DATABASE_ID,
        environment.QUOTE,
        [Query.limit(100)]
      );
      let offset = response.documents.length;
      while (response.documents.length > 0) {
        response.documents.forEach((document: any) => {
          let quote = {
            id: document.$id,
            quote: document.quote,
            username: document.username,
            date: new Date(document.date),
            reactions: document.reaction.map((reaction: any) => {
              return {
                id: reaction.$id,
                emoji: reaction.emoji,
                isMine: this.auth.isOwnedByMe(reaction.$permissions),
              };
            }),
          };
          quotes.push(quote);
        });
        //only need to load for more if the response is full
        if (response.documents.length == 100) {
          response = await this.databases.listDocuments(
            environment.DATABASE_ID,
            environment.QUOTE,
            [Query.limit(100), Query.offset(offset)]
          );
          offset += response.documents.length;
        } else {
          break;
        }
      }
      //sort by date
      quotes.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
    } catch (error) {
      console.log(error);
    }

    return quotes;
  }

  searchIntoObjectFields(objects: Object[], search: string): Object[] {
    let results: Object[] = [];
    try {
      //check if the search is not empty and if it's in any of the object fields
      if (search != '') {
        objects.forEach((object: any) => {
          let found = false;
          for (const [key, value] of Object.entries(object)) {
            //if the value is a string and contains the search
            if (typeof value === 'string') {
              if (
                value.toString().toLowerCase().includes(search.toLowerCase())
              ) {
                found = true;
                break;
              }
            }
          }
          if (found) {
            results.push(object);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return results;
  }

  async reactToQuote(quote: Quote, reaction: string): Promise<Response> {
    let res: Response;

    const myPreviousReaction = quote.reactions.find(
      (reaction) => reaction.isMine
    );
    try {
      //update reaction
      if (myPreviousReaction) {
        await this.databases.updateDocument(
          environment.DATABASE_ID,
          environment.REACTION,
          myPreviousReaction.id,
          {
            emoji: reaction,
          }
        );
        res = { type: ResponseType.Success, value: myPreviousReaction.id };
      } else {
        //create my first reaction on this quote
        const reac = await this.databases.createDocument(
          environment.DATABASE_ID,
          environment.REACTION,
          ID.unique(),
          {
            emoji: reaction,
          }
        );
        const existingReaction = quote.reactions.map((reaction) => reaction.id);

        //add reaction to quote
        await this.databases.updateDocument(
          environment.DATABASE_ID,
          environment.QUOTE,
          quote.id,
          {
            reaction: [...existingReaction, reac.$id],
          }
        );
        res = { type: ResponseType.Success, value: reac.$id };
      }
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
      this.toast.Show(res.value, res.type);
    }

    return res;
  }

  async removeReaction(quote: Quote): Promise<Response> {
    let res: Response;
    try {
      const myPreviousReaction = quote.reactions.find(
        (reaction) => reaction.isMine
      );
      if (myPreviousReaction) {
        const existingReaction = quote.reactions
          .map((reaction) => reaction.id)
          .filter((id) => id !== myPreviousReaction.id);

        //remove reaction from quote
        await this.databases.updateDocument(
          environment.DATABASE_ID,
          environment.QUOTE,
          quote.id,
          {
            reaction: [...existingReaction],
          }
        );

        //remove reaction
        await this.databases.deleteDocument(
          environment.DATABASE_ID,
          environment.REACTION,
          myPreviousReaction.id
        );
      }
      res = { type: ResponseType.Success, value: 'Reaction removed' };
    } catch (error) {
      res = { type: ResponseType.Error, value: getErrorMessage(error) };
      this.toast.Show(res.value, res.type);
    }
    return res;
  }
}
