import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../client/component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirm(msg) {
    return  this.dialog.open(DialogDeleteComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '200px'},
      data: {
        message: msg,
      }
    })
  };
}
