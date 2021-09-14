import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../client/component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';
import {DialogReturnComponent} from '../client/component/flight-ticket/flight-management/dialog-return/dialog-return.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirm(msg) {
    return  this.dialog.open(DialogDeleteComponent, {
      width: '420px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '130px'},
      data: {
        message: msg,
      }
    }) ;
  }
  openConfirm1() {
    return  this.dialog.open(DialogReturnComponent, {
      width: '450px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '130px'},
    }) ;
  }
}
