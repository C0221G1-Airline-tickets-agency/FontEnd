import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {Scenic} from '../../../../model/destination/scenic';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-scenic-create',
  templateUrl: './scenic-create.component.html',
  styleUrls: ['./scenic-create.component.css']
})
export class ScenicCreateComponent implements OnInit {
  scenicForm: FormGroup = new FormGroup({
    scenicName: new FormControl(),
    scenicDescription: new FormControl(),
    scenicImage: new FormControl(),
  });
  scenic: Scenic;
  constructor(
    public dialogRef: MatDialogRef<ScenicCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  submit() {
    this.scenic = this.scenicForm.value;
    console.log(this.scenic);
    this.dialogRef.close(this.scenic);
  }
}
