import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {Scenic} from '../../../../model/destination/scenic';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-scenic-create',
  templateUrl: './scenic-create.component.html',
  styleUrls: ['./scenic-create.component.css']
})
export class ScenicCreateComponent implements OnInit {
  regex = '^[a-zA-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰ' +
          'ẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]*$';
  scenicForm: FormGroup = new FormGroup({
    scenicName: new FormControl('', [Validators.required, Validators.maxLength(20),
                                  Validators.minLength(5), Validators.pattern(this.regex)]),
    scenicDescription: new FormControl('', [Validators.required, Validators.maxLength(200),
                                        Validators.minLength(10)]),
    scenicImage: new FormControl(),
  });
  scenic: Scenic;
  selectedImage: any = null;
  url = '';
  messageValidUrl = '';
  constructor(public dialogRef: MatDialogRef<ScenicCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  submit() {
    if (this.scenicForm.invalid) { return this.openSnackBarInvalid ('Có lỗi xãy ra, xin vui lòng nhập lại!!!'); }
    if (this.selectedImage != null) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.scenicForm.patchValue({scenicImage: url});
            this.scenic = this.scenicForm.value;
            this.openSnackBar('Tạo bài viết thành công!');
            this.dialogRef.close(this.scenic);
          });
        })
      ).subscribe();
    } else {
      this.messageValidUrl = 'Chưa chọn ảnh';
    }
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

  onAddScenic() {
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
  openSnackBarInvalid(msg: string) {
    this.snackBar.open(msg , null, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snack-bar-invalid']
    });
  }
}
