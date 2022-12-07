import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Profile } from 'src/app/models/Profile';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';



@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    private user: User | null = null;
    private profile: Profile | null = null;
    
    public fname: string = "";
    public lname: string = "";
    public drink: string = "";
    public aboutme: string = "";
    public layout: string = "";

    public constructor(private backend: BackendService, private context: ContextService, private router: Router) {
    }

    public ngOnInit(): void {
        if(this.context.loggedInUsername==""){
            this.router.navigate(["/login"]);
        }

        this.backend.loadCurrentUser()
        .subscribe((user: any) => {
            if (user == null) {
                console.log("Fehler");
            } else {
                this.user = user;
                this.profile = new Profile(
                    user.firstName ? user.firstName : '', 
                    user.lastName ? user.lastName : '',
                    user.coffeeOrTea ? user.coffeeOrTea : 'neither',
                    user.description ? user.description : '',
                    user.layout ? user.layout : ''
                );
                this.fname = this.profile.firstName;
                this.lname = this.profile.lastName;
                this.drink = this.profile.coffeeOrTea;
                this.aboutme = this.profile.description;
                this.layout = this.profile.layout;
            }
        })
    }

    public submit(): void {
        if (this.profile !== null) {
            this.profile.firstName = this.fname;
            this.profile.lastName = this.lname;
            this.profile.coffeeOrTea = this.drink;
            this.profile.description = this.aboutme;
            this.profile.layout = this.layout;
            
            this.backend.saveCurrentUserProfile(this.profile)
            .subscribe((success) => console.log("Saved profile:", success));
            this.router.navigate(["/friends"]);
        }
    }
}
