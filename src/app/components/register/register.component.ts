import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //Daten
    public username:string ="";
    public password:string ="";
    public cpassword:string ="";
    public usernameOK:boolean=false;
    public usernameExists:boolean=true;
    public passwordOK:boolean=false;

    public constructor(private router:Router, private backendService:BackendService) { 
    }

    public ngOnInit(): void {
    }

    public validateUsername(): void{
        if (this.username.length >2){
            this.usernameOK = true;
        }else{
            this.usernameOK = false;
        }
        this.backendService.userExists(this.username)
        .subscribe((ok:boolean) =>{
            if(ok){
                this.usernameExists=true;
            }else{
                this.usernameExists=false;
            }
        })
    }

    public validatePassword(): void{
        if(this.password.length > 7){
            this.passwordOK = true;
        }else{
            this.passwordOK = false;
        }
        
    }
    public register(): void{
        this.backendService.register(this.username,this.password)
        .subscribe((ok:boolean) =>{
            if(ok){
                console.log("Registration successful");
                this.router.navigate(["/friends"]);
            }else{
                console.log("Something went wrong.")
            }
        })
    }

    public test(): void{
        console.log("test");
    }

}
