import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayFlat: boolean= true;
  constructor() { }

  ngOnInit(): void {
  }

  controlInbox() {
    if(this.displayFlat){
      this.displayFlat=false;
    }else {
      this.displayFlat=true;
    }
  }
  closeBox(e:boolean) {
    this.displayFlat=e;
  }

}
