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

        }


    //loadUser(this.context.currentChatUsername)
    //friend.unreadMessages = map.get(friend.username)
