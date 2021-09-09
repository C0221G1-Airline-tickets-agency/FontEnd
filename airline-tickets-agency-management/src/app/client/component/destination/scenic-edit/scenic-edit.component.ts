import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Scenic} from '../../../../model/destination/scenic';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {DestinationService} from '../../../../service/destination/destination.service';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-scenic-edit',
  templateUrl: './scenic-edit.component.html',
  styleUrls: ['./scenic-edit.component.css']
})
export class ScenicEditComponent implements OnInit {
  regex = '^[a-zA-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰ' +
          'ẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]*$';
  scenicForm: FormGroup = new FormGroup({
    scenicId: new FormControl(),
    scenicName: new FormControl('', [Validators.required, Validators.maxLength(20),
                                  Validators.minLength(5), Validators.pattern(this.regex)]),
    scenicDescription: new FormControl('', [Validators.required, Validators.maxLength(200),
                                        Validators.minLength(10)]),
    scenicImage: new FormControl(),
  });
  scenic: Scenic;
  selectedImage: any = null;
  url = '';
  constructor(public dialogRef: MatDialogRef<ScenicEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              public destinationService: DestinationService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }
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
    if (this.scenicForm.invalid) { return; }
    if (this.selectedImage != null) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.scenicForm.patchValue({scenicImage: url});
            this.scenic = this.scenicForm.value;
            this.dialogRef.close(this.scenic);
            this.openSnackBar('Cập nhật bài viết thành công!');
          });
        })
      ).subscribe();
    } else {
      this.scenic = this.scenicForm.value;
      this.dialogRef.close(this.scenic);
      this.openSnackBar('Cập nhật bài viết thành công!');
    }
    }

  onUpdateScenic() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit();
      }
    });
  }
  openSnackBar(msg: string) {
    this.snackBar.open(msg , null, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-bar']
    });
  }
}
