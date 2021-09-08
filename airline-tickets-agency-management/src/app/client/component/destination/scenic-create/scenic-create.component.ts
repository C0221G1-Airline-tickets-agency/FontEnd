import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {Scenic} from '../../../../model/destination/scenic';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

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
  selectedImage: any = null;
  constructor(
    public dialogRef: MatDialogRef<ScenicCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.scenicForm.patchValue({scenicImage: url});
          this.scenic = this.scenicForm.value;
          this.dialogRef.close(this.scenic);
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
