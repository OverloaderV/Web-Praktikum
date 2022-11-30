import { Component, OnInit } from '@angular/core';

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
    public usernameExists:boolean=false;
    public passwordOK:boolean=false;

    public constructor() { 
    }

    public ngOnInit(): void {
    }

    public validateUsername():void{
        if (this.username.length >2){
            this.usernameOK = true;
        }else{
            this.usernameOK = false;
        }
    }

    public validatePassword():void{
        if(this.password.length > 7){
            this.passwordOK = true;
        }else{
            this.passwordOK = false;
        }
    }
    public keyUp():void{

    }

}
