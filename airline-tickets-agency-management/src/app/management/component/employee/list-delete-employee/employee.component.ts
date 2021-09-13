import {Component, ElementRef, OnInit} from '@angular/core';
import {EmployeeService} from '../../../../service/employee/employee.service';
import {Employee} from '../../../../model/employee';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';

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
  isLoading = true;
  flag = false;
  employeeIdRole = 0;

  constructor(private sv: EmployeeService, private toast: ToastrService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.getList();
    addEventListener('keydown', event => {
      console.log('keydown', event.keyCode);
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('my-element')
      .addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    console.log(event);
  }


  getList() {
    this.sv.getListEmployee(this.typeSearch, this.valueSearch, this.page).subscribe(data => {
        this.isFail = false;
        // @ts-ignore
        this.employees = data.content;
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        data.numberOfElements === 1 ? this.flag = true : this.flag = false;
        if (this.employees.length < 1) {
          this.isFail = true;
        }
        // @ts-ignore
        this.pages = new Array<any>(data.totalPages);
      }, error => {
        this.isLoading = false;
        this.isFail = true;
        this.employees = [];
        console.log('Lỗi');
      }, () => {
        this.isLoading = false;
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
    if (this.employeeIdChoice === this.employeeIdRole) {
      this.toast.error('Lỗi', 'Thông báo');
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
            this.toast.success('Xoá thành công', 'Thông báo');
            this.employeeIdChoice = 0;
            if (this.flag) {
              this.page = this.pages.length - 2;
            }
            this.getList();
          }, error => {
            this.toast.error('Lỗi', 'Thông báo');
            this.employeeIdChoice = 0;
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
      case 'user_name':
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
