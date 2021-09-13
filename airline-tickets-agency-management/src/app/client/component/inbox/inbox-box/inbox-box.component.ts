import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatboxService} from '../../../../service/chatbox.service';


@Component({
  selector: 'app-inbox-box',
  templateUrl: './inbox-box.component.html',
  styleUrls: ['./inbox-box.component.css']
})
export class InboxBoxComponent implements OnInit {
  flat:boolean =false;
  contractFlat:boolean=false;
  @Output() closeFlat:EventEmitter<any>=new EventEmitter<any>();
  constructor(
    private auth:ChatboxService
  ) { }

  ngOnInit(): void {
  }

  takeControl(control:boolean) {
    this.flat=control;
  }

  closeBox() {
    this.closeFlat.emit(true);
  }

  logOut(){
    this.auth.logout();
    this.flat=false;
    this.closeContract();
  }

  closeContract() {
    if (this.contractFlat){
      this.contractFlat=false;
    }else {
      this.contractFlat=true;
    }
  }
}
