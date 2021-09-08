import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Scenic} from '../../../../model/destination/scenic';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {DestinationService} from '../../../../service/destination/destination.service';

@Component({
  selector: 'app-scenic-edit',
  templateUrl: './scenic-edit.component.html',
  styleUrls: ['./scenic-edit.component.css']
})
export class ScenicEditComponent implements OnInit {
  scenicForm: FormGroup = new FormGroup({
    scenicId: new FormControl(),
    scenicName: new FormControl(),
    scenicDescription: new FormControl(),
    scenicImage: new FormControl(),
  });
  scenic: Scenic;
  selectedImage: any = null;
  url = '';
  constructor(public dialogRef: MatDialogRef<ScenicEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              public destinationService: DestinationService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.findScenicById(this.data);
  }
  findScenicById(id: number) {
    return this.destinationService.findScenicById(id).subscribe(next => {
      console.log(next);
      this.scenic = next;
      this.url = next.scenicImage;
      this.scenicForm.patchValue(this.scenic);
      console.log(this.scenicForm);
    });
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
         this.url = url;
        });
      })
    ).subscribe();
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  submit() {
    if (this.selectedImage != null) {
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
    } else {
      this.scenic = this.scenicForm.value;
      this.dialogRef.close(this.scenic);
    }
    }
}
