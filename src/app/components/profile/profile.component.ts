import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { Profile } from 'src/app/models/Profile';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private profile: Profile | null = null;

    public uname = "";
    public description = "";
    public drink = "";
    public name = "";

    public constructor(private backend: BackendService, private context:ContextService,private router:Router) { 
    }

    public ngOnInit(): void {
        if(this.context.loggedInUsername==""){
            this.router.navigate(["/login"]);
        }
        
        this.backend.loadUser(this.context.currentChatUsername)
        .subscribe((user: any) => {
            this.uname = this.context.currentChatUsername;            
            if (user == null) {
                console.log("Fehler");
            } else {
                this.profile = new Profile(
                    user.firstName ? user.firstName : '', 
                    user.lastName ? user.lastName : '',
                    user.coffeeOrTea ? user.coffeeOrTea : 'neither',
                    user.description ? user.description : '',
                    user.layout ? user.layout : ''
                );
                
                this.description = this.profile.description;
                this.drink = this.profile.coffeeOrTea;
                this.name = this.profile.firstName.concat(" ").concat(this.profile.lastName);
            }
            
        });
    }

}
