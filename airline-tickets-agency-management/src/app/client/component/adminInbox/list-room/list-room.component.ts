import {AfterViewChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';

import firebase from 'firebase';
import {ChatboxService, snapshotToArray} from '../../../../service/chatbox.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  listRoom: any[];

  @Output() currentRoom:EventEmitter<string>=new EventEmitter<string>();
  msg:string;
  email: string;
  password: string;
  check: boolean= false;

  constructor(
    private auth:ChatboxService
  ) {}

  async ngOnInit() {
    this.check=false;
    await firebase.database().ref('rooms').on('value', res=>{
      this.listRoom = snapshotToArray(res);
      console.log(snapshotToArray(res))

    });

    setTimeout(()=>{
      this.check=true;
    },2000);
    console.log("list room");
  }

  goToRoom(roomname:string){
    this.currentRoom.emit(roomname);
  }

  login() {
    this.auth.login(this.email,this.password);
  }
}
