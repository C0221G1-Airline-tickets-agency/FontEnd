import {Component, Input, OnInit} from '@angular/core';

import {ChatboxService} from '../../../../service/chatbox.service';

@Component({
  selector: 'app-manage-chat-form',
  templateUrl: './manage-chat-form.component.html',
  styleUrls: ['./manage-chat-form.component.css']
})
export class ManageChatFormComponent implements OnInit {
  msg: string;
  @Input() roomname:string;
  constructor(
    private auth:ChatboxService
  ) { }

  ngOnInit(): void {
  }

  sendMessage(){
    if(this.msg != null){
      this.auth.sendMessageByAdmin(this.msg,this.roomname);
      this.msg='';
    }

  }

  handleKeyDow(event) {
    if (event.keyCode===13){
      this.sendMessage();
    }
  }
}
