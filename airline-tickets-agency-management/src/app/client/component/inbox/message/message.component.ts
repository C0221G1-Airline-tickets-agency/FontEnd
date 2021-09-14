import {Component, Input, OnInit} from '@angular/core';
import {ChatboxService} from '../../../../service/chatbox.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message:any;
  ownNick:string;
  constructor(
    private auth:ChatboxService
  ) {}

  ngOnInit(): void {
    this.ownNick=this.auth.getUser().displayName;
  }
}
