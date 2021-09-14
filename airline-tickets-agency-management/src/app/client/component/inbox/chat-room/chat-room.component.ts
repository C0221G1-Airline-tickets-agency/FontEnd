import {AfterViewChecked, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ChatboxService} from '../../../../service/chatbox.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit,AfterViewChecked {
  @ViewChild('scroll') scrollView:ElementRef;

  // flat:boolean=false;
  constructor(
    private auth:ChatboxService
  ) { }

  ngOnInit(): void {
  }

  scrollBottom() {
    this.scrollView.nativeElement.scrollTop
      = this.scrollView.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(): void {
    this.scrollBottom();
  }

}
