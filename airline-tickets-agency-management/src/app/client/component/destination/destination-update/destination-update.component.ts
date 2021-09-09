import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {Scenic} from '../../../../model/destination/scenic';
import {MatDialog} from '@angular/material/dialog';
import {DestinationService} from '../../../../service/destination/destination.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {ScenicCreateComponent} from '../scenic-create/scenic-create.component';
import {finalize} from 'rxjs/operators';
import {ScenicEditComponent} from '../scenic-edit/scenic-edit.component';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-destination-update',
  templateUrl: './destination-update.component.html',
  styleUrls: ['./destination-update.component.css']
})
export class DestinationUpdateComponent implements OnInit {
  regex = '^[a-zA-Z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰ' +
    'ẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]*$';
  destinationForm: FormGroup = new FormGroup({
    destinationId: new FormControl(),
    destinationName: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.regex)]),
    destinationDescription: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]),
    destinationImage: new FormControl(),
  });
  destination: Destiation;
  listScenics: Scenic[] = [];
  selectedImage: any = null;
  desinationId = 12;
  url = '';
  scenic: Scenic;
  messageUnique = '';
  messageEmptyScenic = '';
  messageErrors: string[] = [];
  constructor(public dialog: MatDialog,
              public destinationService: DestinationService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDestination(this.desinationId);
    this.getScenic(this.desinationId);
  }
  getDestination(id: number) {
    return this.destinationService.findById(id).subscribe(next => {
      this.destination = next;
      this.url = next.destinationImage;
      this.destinationForm.patchValue(this.destination);
      console.log(this.destinationForm);
    });
  }
  getScenic(id: number) {
    return this.destinationService.getScenic(id).subscribe(next => {
      this.listScenics = next;
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
    if (this.destinationForm.invalid) { return; }
    if (this.selectedImage != null) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.destinationForm.patchValue({destinationImage: url});
            this.destination = {...this.destinationForm.value, listScenic: this.listScenics};
            this.destinationService.updateDestination(this.destination).subscribe(next => {
              console.log(next);
              if (next.status) {
                this.listScenics = [];
                this.destinationForm.reset();
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
      this.destination = {...this.destinationForm.value, listScenic: this.listScenics};
      this.destinationService.updateDestination(this.destination).subscribe(next => {
        console.log(next);
        if (next.status) {
          this.listScenics = [];
          this.destinationForm.reset();
          this.openSnackBar(next.msg);
        } else {
          this.messageErrors = next.errors;
          this.messageUnique = next.msgUnique;
          this.messageEmptyScenic = next.msgEmptyScenic;
        }
      });
    }
  }

  onAddScenicHandler() {
    const dialogRef = this.dialog.open(ScenicCreateComponent, {
      width: '665px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.scenic = {...result, scenicId: this.desinationId, destination: this.destination};
        console.log(this.scenic);
        this.destinationService.addScenic(this.scenic).subscribe(next => {
          this.getScenic(this.desinationId);
        });
      }
    });
  }

  delScenic(i: number) {
    this.destinationService.delScenic(i).subscribe(next => {
      this.getScenic(this.desinationId);
    });
  }

  editScenic(scenicId: number) {
    console.log(scenicId);
    const dialogRef = this.dialog.open(ScenicEditComponent, {
      width: '665px',
      data: scenicId
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.scenic = {...result, destination: this.destination};
        console.log(this.scenic);
        this.destinationService.updateScenic(this.scenic).subscribe(next => {
          this.getScenic(this.desinationId);
        });
      }
    });
  }

  onUpdateDestinationHandler() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit();
      }
    });
  }

  delConfirm(scenicId: number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delScenic(scenicId);
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
}
