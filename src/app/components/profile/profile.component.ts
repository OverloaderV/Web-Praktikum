import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public constructor(private context:ContextService,private router:Router) { 
    }

    public ngOnInit(): void {
        if(this.context.loggedInUsername==""){
            this.router.navigate(["/login"]);
        }
    }

}
