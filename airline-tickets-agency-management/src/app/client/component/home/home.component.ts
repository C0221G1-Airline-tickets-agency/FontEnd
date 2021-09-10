import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Destination} from '../../../model/destination/Destination';
import {DestinationService} from '../../../service/destiantion/destination.service';
import {DestinationDeleteComponent} from '../destination-delete/destination-delete.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  page = 0;
  sortBy = 'destination_id';
  destinations: Destination[] = [];
  pages: Array<any> = [];
  destination: Destination;
  change: number;

  // tslint:disable-next-line:max-line-length
  constructor(private destinationService: DestinationService, private dialog: MatDialog, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.page != null) {
        this.page = params.page - 1;
      }

      console.log(this.page); // Print the parameter to the console.
    });
  }
  ngOnInit(): void {
    this.showDestination();
  }
  showDestination() {
    this.destinationService.showListDestination(this.page, this.sortBy).subscribe(destination => {
      // tslint:disable-next-line:triple-equals
      if (destination == null) {
        this.destinations = [];
        this.page = 0;
      } else {
        this.destinations = destination.content;
        this.pages = new Array<any>(destination.totalPages);
        console.log(this.pages);
        console.log(this.destinations);
      }
    });
  }
  setPage(i: number) {
    this.page = i;
    this.showDestination();
  }
  errorPage() {
    this.toastr.error('không tìm thấy trang', 'thông báo');
  }
  previous() {
    if (this.page === 0) {
      this.errorPage();
    } else {
      this.page = this.page - 1;
      this.showDestination();
    }
  }
  next() {
    if (this.page > this.pages.length - 2) {
      this.errorPage();
    } else {
      this.page = this.page + 1;
      this.showDestination();
    }
  }
  showSuccessDelete() {
    this.toastr.success('Đã xóa thành công !', 'Thông báo : ');
  }
  showErrorDelete() {
    this.toastr.error('Vui lòng chọn nhân viên bạn muốn xóa !', 'Cảnh báo : ');
  }
  deleteDestination(destinationName, destinationId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      html: '<span style="color: #dc3545">' + 'địa điểm có tên là : ' + destinationName + '</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: '&emsp;Huỷ&emsp;',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.destinationService.deleteDestinationByRequest(destinationId).subscribe(e => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xoá thành công',
              showConfirmButton: false,
              timer: 1500
            });
            this.showDestination();
          }, error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Lỗi',
              showConfirmButton: false,
              timer: 1500
            });
            this.showDestination();
          }
        );
      }
    });
  }
}
