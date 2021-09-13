import {AfterViewChecked, Component, OnChanges, OnInit} from '@angular/core';

import firebase from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import auth = firebase.auth;
import {ChatboxService} from '../../../../service/chatbox.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit,OnChanges {
  messages:Observable<any[]>
  constructor(
    private auth:ChatboxService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(auth=>{
      if (auth!=null||auth!=undefined){
        const roomname='room_'+auth.displayName
        this.messages=this.auth.getMessage(roomname);
      }
    })
  }

  ngOnChanges(): void {
    const roomname='room_'+this.auth.getUser().displayName;
    this.messages=this.auth.getMessage(roomname);
  }




}
