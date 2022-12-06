import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    //Daten
    public success:boolean=true;
    public username:string="";
    public password:string="";

    public constructor(private router:Router,private backendService:BackendService, private interval:IntervalService) { 
    }

    public ngOnInit(): void {
        this.interval.clearIntervals();
    }

    public login(): void{
        this.backendService.login(this.username,this.password)
        .subscribe((ok) =>{
            if(ok){
                console.log("login success");
                this.router.navigate(["/friends"])
            }else{
                this.success=false;
            }
        })
    }
}
