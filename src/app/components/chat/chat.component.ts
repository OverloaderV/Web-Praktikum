import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
    // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
    @ViewChild('messagesDiv') private myScrollContainer: ElementRef;
    public name:string;

     public constructor(private context:ContextService,private router:Router,private backEnd:BackendService) { 
        this.myScrollContainer = new ElementRef(null);
        this.name = context.currentChatUsername;

    }   

    public ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    /**
     * Setzt in der Nachrichtenliste die Scrollposition ("scrollTop") auf die DIV-Größe ("scrollHeight"). Dies bewirkt ein 
     * Scrollen ans Ende.
     */
    private scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { 
        }                 
    }

    public ngOnInit(): void {
        this.scrollToBottom();

    }

    public remove(str:string){
        let bool:boolean = confirm("Do you really want to remove "+str+" as a friend?")
            this.backEnd.removeFriend(str)
            .subscribe((ok:boolean) =>{
                if(ok){
                    this.router.navigate(["/friends"])
                }
            }
            );

    }

}
