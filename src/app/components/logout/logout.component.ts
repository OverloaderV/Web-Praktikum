import { Component, OnInit } from '@angular/core';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private interv:IntervalService) { }

  ngOnInit(): void {
    this.interv.clearIntervals();
  }

}
