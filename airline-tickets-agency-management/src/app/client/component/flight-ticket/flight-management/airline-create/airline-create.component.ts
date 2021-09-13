import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Airline} from "../../../../../model/flight-ticket/airline";
import {AirlineService} from "../../../../../service/flight-ticket/airline/airline.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-airline-create',
  templateUrl: './airline-create.component.html',
  styleUrls: ['./airline-create.component.css']
})
export class AirlineCreateComponent implements OnInit {

  formCreateAirline: FormGroup;
  listAirline: Airline[] = [];
  selectedImage: any = null;
  constructor(private airlineService : AirlineService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.formCreateAirline = new FormGroup({
      airlineId: new FormControl(''),
      airlineName: new FormControl(''),
      logo: new FormControl('')
    })
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  save() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.formCreateAirline.patchValue({logo: url});

          // Call API to create airline
          this.airlineService.saveAirline(this.formCreateAirline.value).subscribe(next => {
            console.log(next)
          })
        });
      })
    ).subscribe();
  }


}
