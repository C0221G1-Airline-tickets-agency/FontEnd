import {Component, Input, OnInit} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {ChatboxService} from '../../../../service/chatbox.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  msg: string;

  constructor(
    private auth:ChatboxService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.afAuth.authState.subscribe(auth=>{
      const roomname='room_'+auth.displayName;
      this.auth.sendMessage(this.msg,roomname);
      this.msg='';
    })
  }

  handleKeyDow(event) {
    if (event.keyCode===13){
      this.sendMessage();
    }
  }
}
