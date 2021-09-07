import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  typeSearch = '';
  valueSearch = '';
  page = 0;
  isFail = false;
  pages: Array<any>;
  employeeIdChoice = 0;
  employeeNameChoice = '';
  mggSearch = '';
  isRole = false;

  constructor(private sv: EmployeeService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.sv.getListEmployee(this.typeSearch, this.valueSearch, this.page).subscribe(data => {
        this.isFail = false;
        // @ts-ignore
        this.employees = data.content;
        if (this.employees.length < 1) {
          this.isFail = true;
        }
        // @ts-ignore
        this.pages = new Array<any>(data.totalPages);
      }, error => {
        this.isFail = true;
        this.employees = [];
        console.log('Lỗi');
      }
    );
  }


  setPage(i: number) {
    this.page = i;
    this.getList();
  }

  previous() {
    if (this.page === 0) {
    } else {
      this.page = this.page - 1;
      this.getList();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
    } else {
      this.page = this.page + 1;
      this.getList();
    }
  }

  getEmployeeDelete(employeeId, employeeName) {
    if (employeeId === this.employeeIdChoice) {
      this.employeeIdChoice = 0;
    } else {
      this.employeeIdChoice = employeeId;
      this.employeeNameChoice = employeeName;
    }
  }

  deleteEmployee() {
    if (this.employeeIdChoice === 0) {
      return;
    }
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      html: '<span style="color: #dc3545">' + this.employeeNameChoice + '</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: '&emsp;Huỷ&emsp;',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.sv.deleteEmployee(this.employeeIdChoice).subscribe(e => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xoá thành công',
              showConfirmButton: false,
              timer: 1500
            });
            this.getList();
          }, error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Lỗi',
              showConfirmButton: false,
              timer: 1500
            });
            this.getList();
          }
        );
      }
    });
  }

  changeTypeSearch(typeSearch) {
    this.isRole = false;
    this.mggSearch = '';
    this.typeSearch = typeSearch.value;
    this.typeSearch === 'employee_code' ? this.valueSearch = 'NV' : this.valueSearch = '';
    switch (typeSearch.value) {
      case 'employee_code':
        break;
      case 'employee_name':
        break;
      case 'employee_birth':
        break;
      case 'email':
        break;
      case 'name':
        this.valueSearch = 'ROLE_ADMIN';
        this.isRole = true;
        break;
    }
  }

  searchEmployee() {
    if (this.typeSearch === '') {
      this.mggSearch = 'Vui lòng chọn tìm kiếm theo';
      return;
    }
    this.getList();
  }


}
