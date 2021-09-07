import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {MatDialog} from '@angular/material/dialog';
import {ScenicCreateComponent} from '../scenic-create/scenic-create.component';
import {Scenic} from '../../../../model/destination/scenic';
import {DestinationService} from '../../../../service/destination/destination.service';

@Component({
  selector: 'app-destination-create',
  templateUrl: './destination-create.component.html',
  styleUrls: ['./destination-create.component.css']
})
export class DestinationCreateComponent implements OnInit {
  destinationForm: FormGroup = new FormGroup({
    destinationName: new FormControl(),
    destinationDescription: new FormControl(),
    destinationImage: new FormControl(),
  });
  destination: Destiation;
  listScenics: Scenic[] = [];
  constructor(public dialog: MatDialog,
              public destinationService: DestinationService) { }

  ngOnInit(): void {
  }

  submit() {
  this.destination = {...this.destinationForm.value, listScenic: this.listScenics};
  console.log(this.destination);
  // this.destinationService.addDestination(this.destination, this.listScenics).subscribe();
  }

  onAddDestinationHandler() {
    const dialogRef = this.dialog.open(ScenicCreateComponent, {
      width: '665px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.listScenics.push(result);
        console.log(this.listScenics);
      }
    });
  }

  delScenic(i: number) {
    this.listScenics.splice(i, 1);
  }
}
