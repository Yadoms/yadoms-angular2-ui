import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'yd-admin-page-header',
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.css']
})
export class AdminPageHeaderComponent implements OnInit {

  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
