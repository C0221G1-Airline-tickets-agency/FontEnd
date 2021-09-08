import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Destiation} from '../../../../model/destination/destiation';
import {MatDialog} from '@angular/material/dialog';
import {ScenicCreateComponent} from '../scenic-create/scenic-create.component';
import {Scenic} from '../../../../model/destination/scenic';
import {DestinationService} from '../../../../service/destination/destination.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadFileService} from '../../../../service/upload-file.service';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

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
  selectedImage: any = null;
  url = '';
  messageValidUrl = '';
  constructor(public dialog: MatDialog,
              public destinationService: DestinationService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  submit() {
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
              }
            });
          });
        })
      ).subscribe();
    } else {
      this.messageValidUrl = 'Chưa chọn ảnh';
    }
  }

  onAddDestinationHandler() {
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
}
