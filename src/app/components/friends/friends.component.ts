import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/Friend';
import { User } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';

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


    public constructor(private router:Router, private backendService:BackendService) {
        
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

        public add(): void {
            let test;
            this.backendService.userExists(this.addInput)
            .subscribe((ok:boolean) => {

                test = ok;
                if(ok) {} else {console.log("user doesn't exist")}

            })
            
            if(test) {
            this.backendService.friendRequest(this.addInput)
            .subscribe((b:boolean) => {

                if(b) {console.log("user added succesfully")}
                else {console.log("user cannot be added")}

            }) 
        }
        }
    }


    //loadUser(this.context.currentChatUsername)
    //friend.unreadMessages = map.get(friend.username)
