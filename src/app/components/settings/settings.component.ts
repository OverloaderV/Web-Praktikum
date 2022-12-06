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
    
    private fname: HTMLElement | null;
    private lname: HTMLElement | null;
    private drink: HTMLSelectElement | null;
    private aboutme: HTMLElement | null;
    private oneline: HTMLInputElement | null;
    private sepline: HTMLInputElement | null;

    public constructor(private backend: BackendService, private context: ContextService, private router: Router) {
        this.fname = document.getElementById("fname");
        this.lname = document.getElementById("lname");
        this.drink = document.getElementById("drink") as HTMLSelectElement;
        this.aboutme = document.getElementById("aboutme");
        this.oneline = document.getElementById("oneline") as HTMLInputElement;
        this.sepline = document.getElementById("sepline") as HTMLInputElement;
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
                    user.chatLayout ? user.chatLayout : ''
                );
                if (this.fname != null) {
                    this.fname.innerText = this.profile.firstName;
                }
                if (this.lname != null) {
                    this.lname.innerText = this.profile.lastName;
                }
                if (this.drink != null) {
                    this.drink.value = this.profile.coffeeOrTea;
                }
                if (this.aboutme != null) {
                    this.aboutme.innerText = this.profile.description;
                }
                if (this.oneline != null && this.sepline != null) {
                    if (this.profile.layout == "oneline") {
                        this.oneline.select();
                    } else if (this.profile.layout == "sepline") {
                        this.sepline.select();
                    }
                }
            }
        })
    }
}
