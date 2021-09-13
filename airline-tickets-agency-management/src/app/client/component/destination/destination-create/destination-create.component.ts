import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {MatDialog} from '@angular/material/dialog';
import {ScenicCreateComponent} from '../scenic-create/scenic-create.component';
import {Scenic} from '../../../../model/destination/scenic';
import {DestinationService} from '../../../../service/destination/destination.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadFileService} from '../../../../service/upload-file.service';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {stringify} from 'querystring';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-destination-create',
  templateUrl: './destination-create.component.html',
  styleUrls: ['./destination-create.component.css']
})
export class DestinationCreateComponent implements OnInit {
  regex = '^[a-zA-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰ' +
    'ẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]*$';
  destinationForm: FormGroup = new FormGroup({
    destinationName: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.regex)]),
    destinationDescription: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]),
    destinationImage: new FormControl(),
  });
  destination: Destiation;
  listScenics: Scenic[] = [];
  selectedImage: any = null;
  url = '';
  messageValidUrl = '';
  messageErrors: string[] = [];
  messageUnique = '';
  messageEmptyScenic = '';
  constructor(public dialog: MatDialog,
              public destinationService: DestinationService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.destinationForm.invalid) { return this.openSnackBarInvalid ('Có lỗi xãy ra, xin vui lòng nhập lại!!!'); }
    if (this.selectedImage != null) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.destinationForm.patchValue({destinationImage: url});
            this.destination = {...this.destinationForm.value, listScenic: this.listScenics};
            this.destinationService.addDestination(this.destination).subscribe(next => {
              console.log(next);
              if (next.status) {
                this.listScenics = [];
                this.destinationForm.reset();
                this.messageValidUrl = '';
                this.messageErrors = [];
                this.messageUnique = '';
                this.messageEmptyScenic = '';
                this.openSnackBar(next.msg);
              } else {
                this.messageErrors = next.errors;
                this.messageUnique = next.msgUnique;
                this.messageEmptyScenic = next.msgEmptyScenic;
              }
            });
          });
        })
      ).subscribe();
    } else {
      this.messageValidUrl = 'Chưa chọn ảnh';
    }
  }

  onAddScenicHandler() {
    const dialogRef = this.dialog.open(ScenicCreateComponent, {
      width: '665px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.listScenics.push(result);
      }
    });
  }

  delScenic(i: number) {
    this.listScenics.splice(i, 1);
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
    this.messageValidUrl = '';
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  onAddDestinationHandler() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit();
      }
    });
  }

  onDelScenicConfirm(i: number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delScenic(i);
      }
    });
  }
  openSnackBar(msg: string) {
    this.snackBar.open(msg , null, {
      duration: 5000,
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
