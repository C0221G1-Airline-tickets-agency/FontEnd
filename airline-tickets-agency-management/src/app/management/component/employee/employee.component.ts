import {Component, OnInit} from '@angular/core';
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
  pages: Array<any>;
  employeeIdChoice = 0;
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

  getEmployeeId(employeeId) {
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
