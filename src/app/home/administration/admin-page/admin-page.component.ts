import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
