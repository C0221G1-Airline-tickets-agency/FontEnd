import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee';

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
  pages: Array<number>;
  employeeIdChoice = -1;
  mggSearch = '';
  isEmployeeCode = false;

  constructor(private sv: EmployeeService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.sv.getListEmployee(this.typeSearch, this.isEmployeeCode ? 'NV' + this.valueSearch : this.valueSearch, this.page).subscribe(e => {
        this.isFail = false;
        this.employees = e.content;
        this.pages = new Array<any>(e.totalPages);
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

  getEmployeeId(employeeId: number) {
    this.employeeIdChoice = employeeId;
  }

  deleteEmployee() {
    this.sv.deleteEmployee(this.employeeIdChoice).subscribe(e => {
      console.log('Xoá thành công');
      this.getList();
    }, error => {
      console.log('Lỗi');
    });
  }

  changeTypeSearch(typeSearch) {
    this.isEmployeeCode = false;
    this.mggSearch = '';
    this.typeSearch = typeSearch.value;
    switch (typeSearch.value) {
      case 'employee_code':
        this.isEmployeeCode = true;
        break;
      case 'employee_name':
        break;
      case 'employee_birth':
        break;
      case 'email':
        break;
      case 'name':
        break;
    }
  }

  searchEmployee() {
    if (this.typeSearch === '') {
      this.mggSearch = 'Vui lòng chọn loại tìm kiếm';
      return;
    }
    this.getList();
  }

}
