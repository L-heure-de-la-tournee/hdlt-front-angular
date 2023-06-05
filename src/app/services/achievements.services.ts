import { Injectable } from '@angular/core';
import { Client, Account, ID, Databases, Query, Functions } from "appwrite";
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.services';
import { AuthentificationService } from './auth.services';
import { Achievement, Status, StatusType } from '../models/hdlt';
import { HDLTServices } from './hdlt.services';

@Injectable({
  providedIn: 'root'
})
export class AchivementsServices {  

    client!:Client;
    account!:Account;
    session!:any;
    isConnected!:boolean;
    databases!:Databases;

    allStatus!:Status[];
    allOnGoingStatus!:Status[];
    uniqueUsers!:string[];
    userStatusNumber!:{username:string,number:number}[];


    constructor(private toast : ToastService, private auth: AuthentificationService,private hdlt:HDLTServices) {
        this.isConnected=false;
        this.client = new Client();
        this.client
        .setEndpoint(environment.API_URL) // Your API Endpoint
        .setProject(environment.PROJECT_ID) // Your project ID
        ;
        this.databases = new Databases(this.client);
    }

    async SetupComparisonData(allStatus:Status[]): Promise<void>{
        this.allStatus = allStatus;
        this.allOnGoingStatus = allStatus.filter(x => x.completed == false);
        let users = this.allStatus.map(status => status.username);
        this.uniqueUsers = users.filter((v, i, a) => a.indexOf(v) === i);
        this.userStatusNumber = this.uniqueUsers.map(user => {return {username: user, number: users.filter(u => u == user).length}});
        this.userStatusNumber.sort((a,b) => b.number - a.number);
    }


    async LoadStatus(username:string): Promise<Status[]>{
        let userStatus = await this.hdlt.GetUserStatus(username);
        return userStatus
    }

    async TryFirst(achievements:Achievement[],username:string): Promise<void>{
        let achievement:Achievement = {name: "First", description: "Tu as le plus de status", image: "first.png",color:"transparent",date: new Date(),occurence: 1};
        //get first user in number of status
        let first = this.userStatusNumber[0];
        if(first.username === username){
            achievements.push(achievement);
        }
    }

    async TryBestOngoing(achievements:Achievement[],username:string): Promise<void>{
        let achievement:Achievement = {name: "Tu vas payer !", description: "Tu as le plus de status en cours", image: "biere.png",color:"#644e37",date: new Date(),occurence: 1};
        //get first user in number of status ongoing
        let users = this.allOnGoingStatus.map(status => status.username);
        let uniqueUsers = users.filter((v, i, a) => a.indexOf(v) === i);
        let userStatusNumber = uniqueUsers.map(user => {return {username: user, number: users.filter(u => u == user).length}});
        userStatusNumber.sort((a,b) => b.number - a.number);
        let first = userStatusNumber[0];
        if(first.username === username){
            achievements.push(achievement);
        }
    }


    async TryNInARow(status:Status[],achievements:Achievement[],n:number,name:string,description:string,image:string): Promise<void>{
        let achievement:Achievement = {name: name, description: description, image: image,color:" #1f3e40  ",date: new Date(),occurence: 0};
        //check if there are enough status to check
        if(status.length >= 2){
            //go throught each status and check if they are n in a row (-n to avoid out of bound)
            for(let i = 0; i < status.length - n; i++){
                let isNInARow = true;
                //check if the next n status are in a row (1 day apart)
                for(let j = 1; j < n; j++){

                    let timeBetween = status[i+j].date.getTime() - status[i].date.getTime();
                    if(Math.abs(timeBetween) > 1000* 60 * 60 * 24 ){
                        isNInARow = false;
                    }else{
                    }
                }
                if(isNInARow){
                    achievement.occurence++;
                }
            }
            if(achievement.occurence > 0){
                achievements.push(achievement);
            }
        }
    }

    async TryFirstWithStatusType(achievements:Achievement[],username:string,statusType:StatusType,name:string,description:string,image:string): Promise<void>{
        let achievement:Achievement = {name: name, description: description, image: image,color:" #697360 ",date: new Date(),occurence: 1};
        //get all status of type statusType
        let status = this.allStatus.filter(status => status.type === statusType.name);
        //sort by date
        status.sort((a,b) => a.date.getTime() - b.date.getTime());
        //get first status
        let first = status[0];
        if(first === undefined) return;
        //check if the first status is from the user
        if(first.username === username){
            achievements.push(achievement);
        }
    }

    async TryMostComplicated(achievements:Achievement[],username:string): Promise<void>{
        let achievement:Achievement = {name: "Champion du c'est compliqué", description: "C'est pas compliqué pourtant couple ou pas couple...", image: "complicated.png",color:"#644e37",date: new Date(),occurence: 1};
        //get user with the most "C'est compliqué" status type
        let status = this.allStatus.filter(status => status.type === "C'est compliqué");
        let users = status.map(status => status.username);
        let uniqueUsers = users.filter((v, i, a) => a.indexOf(v) === i);
        let userStatusNumber = uniqueUsers.map(user => {return {username: user, number: users.filter(u => u == user).length}});
        userStatusNumber.sort((a,b) => b.number - a.number);
        //get list of user that are first or tied for first
        let first = userStatusNumber.filter(user => user.number === userStatusNumber[0].number);
        //check if the user is in the list
        if(first.find(user => user.username === username) !== undefined){
            achievement.occurence = first[0].number;
            achievements.push(achievement);
        }

    }

    async TryMostPlaid(achievements:Achievement[],username:string): Promise<void>{
        let achievement:Achievement = {name: "Champion du plaid", description: "Tu as le plus de status avec un plaid", image: "plaid.png",color:"#644e37",date: new Date(),occurence: 1};
        //get user with the most time the word "plaid" or "pled" in status name
        let status = this.allStatus.filter(status => status.name.toLowerCase().includes("plaid") || status.name.toLowerCase().includes("pled"));
        let users = status.map(status => status.username);
        let uniqueUsers = users.filter((v, i, a) => a.indexOf(v) === i);
        let userStatusNumber = uniqueUsers.map(user => {return {username: user, number: users.filter(u => u == user).length}});
        userStatusNumber.sort((a,b) => b.number - a.number);
        //get list of user that are first or tied for first
        let first = userStatusNumber.filter(user => user.number === userStatusNumber[0].number);
        //check if the user is in the list
        if(first.find(user => user.username === username) !== undefined){
            achievement.occurence = first[0].number;
            achievements.push(achievement);
        }
    }

    async TryMostXStatus(achievements:Achievement[],username:string,type:StatusType,name:string,description:string,image:string): Promise<void>{
        let achievement:Achievement = {name: name, description: description, image: image,color:"#ecea43",date: new Date(),occurence: 1};
        //get user with the most status of type type
        let status = this.allStatus.filter(status => status.type === type.name);
        let users = status.map(status => status.username);
        let uniqueUsers = users.filter((v, i, a) => a.indexOf(v) === i);
        let userStatusNumber = uniqueUsers.map(user => {return {username: user, number: users.filter(u => u == user).length}});
        userStatusNumber.sort((a,b) => b.number - a.number);
        //get list of user that are first or tied for first
        let first = userStatusNumber.filter(user => user.number === userStatusNumber[0].number);
        //check if the user is in the list
        if(first.find(user => user.username === username) !== undefined){
            achievement.occurence = first[0].number;
            achievements.push(achievement);
        }
    }

    async TryTropStable(achievements:Achievement[],username:string): Promise<void>{
        await this.TryMostXStatus(achievements,username,{id:"",name:"trop stable"},"Casseur d'ambiance","","stable.png");
        //change the description 
        let ach= achievements.find(achievement => achievement.name === "Casseur d'ambiance")
        if(ach !== undefined){
            ach.description = ach.occurence+" an"+(ach.occurence>1?'s':'')+" sans payer de tournée ? pfff...";;
        }
    }

    async TryNewbie(achievements:Achievement[],username:string): Promise<void>{
        let achievement:Achievement = {name: "Newbie", description: "1 seul status ? c'est tout ? on a soif !", image: "newbie.png",color:"#ecea43",date: new Date(),occurence: 1};
        //get user with 1 status
        let status = this.allStatus.filter(status => status.username === username);
        if(status.length === 1){
            achievements.push(achievement);
        }
    }



    async GetAchievements(username:string): Promise<Achievement[]>{
        let status = await this.LoadStatus(username);
        let achievements:Achievement[] = [];
        await this.TryFirst(achievements,username);
        await this.TryBestOngoing(achievements,username);

        //first
        //premier pet
        await this.TryFirstWithStatusType(achievements,username,{id:"",name:"animal de compagnie"},"Animal lover","Premier avec un animal de compagnie","pet.png");
        //permier demenagement
        await this.TryFirstWithStatusType(achievements,username,{id:"",name:"déménagement"},"Déménageur","Premier à déménagement","package.png");
        //premier amputé
        await this.TryFirstWithStatusType(achievements,username,{id:"",name:"Amputation diverse et variée"},"Amputé","Premier amputé","surgeon.png");
        //premier avec nouveau métier/boulot
        await this.TryFirstWithStatusType(achievements,username,{id:"",name:"nouveau métier/boulot"},"Nouveau métier","Premier avec un nouveau métier","job.png");
        

        //most
        await this.TryMostComplicated(achievements,username);
        await this.TryTropStable(achievements,username);
        await this.TryMostPlaid(achievements,username);
        await this.TryNewbie(achievements,username);

        //streaks
        await this.TryNInARow(status,achievements,2,"Deux de suite !","Deux changement de status en deux jours","two.png");
        await this.TryNInARow(status,achievements,3,"Jamais deux sans trois","Trois changement de status en trois jours","three.png");

        achievements.push({name: "HDLT", description: "Membre de HDLT", image: "beer.png",color:"black",date: new Date(),occurence: 1})
        return achievements;
    }

   
}