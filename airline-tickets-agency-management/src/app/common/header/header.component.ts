import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDropDown = false;
  isLogin = false;
  accountName = 'Việt Nam Vô Địch';
  @Input()
  isAdmin = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  getDropDown() {
    this.isDropDown = !this.isDropDown;
  }



}
