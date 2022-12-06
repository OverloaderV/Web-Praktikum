import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/Friend';
import { User } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { IntervalService } from 'src/app/services/interval.service';
 
@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    public friend: Array<Friend> = [];
    public messages!: Map<string, number>
    //public currentUser:User;
    public currentUser = new User();
    public user: Array<string> = [];
    public addInput:string = "";
    public curUser:String ="";


    public constructor(private router:Router, private backendService:BackendService, private context:ContextService, private intervalService:IntervalService) {
        this.curUser= context.loggedInUsername;
        intervalService.setInterval("friends.component", ()=> {this.refresh()});
    }

    public ngOnInit(): void {

        this.backendService.loadCurrentUser()
        .subscribe((user:User| null) =>{
                this.currentUser = user as User;
            })

        this.backendService.loadFriends()
            .subscribe((friend:Array<Friend>) => {
                this.friend = friend;
            })

        this.backendService.unreadMessageCounts()
            .subscribe((messages:Map<string, number>) => {
                this.messages = messages;
             })
              //const friends = this.currentUser.friends;

        for(let i = 0; i < this.friend.length; i++) {
            this.friend[i].unreadMessages = this.messages.get(this.friend[i].username) as number;
               }

            }

        public chat(str:string){
            this.context.currentChatUsername = str.toString();
            this.router.navigate(["/chat"]);
        }

        public add(): void {
            let test;
            this.backendService.userExists(this.addInput)
            .subscribe((ok:boolean) => {
                
                if(ok) {
                
                    this.backendService.friendRequest(this.addInput)
                    .subscribe((b:boolean) => {
        
                        if(b) {console.log("friend reqeust send")}
                        else {console.log("friend request cannot be send")}
        
                    }) 
            
            } else {console.log("user doesn't exist")}
            })
            
        }
        public accept(fr:Friend):void {

            let username = fr.username;
            let acceptedUser;
            this.backendService.acceptFriendRequest(username)
            .subscribe((ok:boolean) => {
                if(ok) {console.log("friend accepted")} 
                else {console.log("friend cannot be accepted")}
            })
            fr.status = "accepted";
            this.router.navigate(["/friends"]);
        }

        public decline(fr:Friend):void {

            let username = fr.username;
            this.backendService.dismissFriendRequest(username)
            .subscribe((ok:boolean) => {

                if(ok) {console.log("friend request dismissed")} 
                else {console.log("friend request cannot be dismissed")}
            })
            this.router.navigate(["/friends"]);
        }
    

    private refresh() {
        
        this.backendService.loadFriends()
              .subscribe((friend:Array<Friend>) => {
                this.friend = friend;
              })
              this.backendService.unreadMessageCounts()
              .subscribe((messages:Map<string, number>) => {
                this.messages = messages;
              })
              //const friends = this.currentUser.friends;

               for(let i = 0; i < this.friend.length; i++) {
                this.friend[i].unreadMessages = this.messages.get(this.friend[i].username) as number;
               }
    }
}

    //loadUser(this.context.currentChatUsername)
    //friend.unreadMessages = map.get(friend.username)
