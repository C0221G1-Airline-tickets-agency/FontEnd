import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserRole} from '../../../../model/account/role';
import {EmployeeService} from '../../../../service/employee/employee.service';
import {UserService} from '../../../../service/user/user.service';
import {UserRoleService} from '../../../../service/user/user-role.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AddRequest} from '../../../../model/employee/add-request';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  selectedImage: any;
  addRequest: AddRequest;

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private storage: AngularFireStorage,
              private router: Router,
              private toastr: ToastrService) {
    this.createEmployeeForm();
  }

  ngOnInit(): void {
    // this.getAllRoleUser();
  }

  createEmployeeForm() {
    this.employeeForm = new FormGroup({
      employeeCode: new FormControl(''),
      employeeName: new FormControl(''),
      employeeBirthday: new FormControl(''),
      employeeGender: new FormControl(''),
      employeePhoneNumber: new FormControl(''),
      employeeAddress: new FormControl(''),
      employeeImage: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    });
  }

  saveEmployee() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        console.log(4);
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(5);
          this.addRequest = this.employeeForm.value;
          this.addRequest.employeeImage = url;
          this.employeeService.addEmployee(this.addRequest).subscribe(() => {
            this.router.navigateByUrl('/management/employee');
            this.toastr.success('Tạo mới thành công', 'Đăng nhập ', {
              timeOut: 2000,
              extendedTimeOut: 1500
            })
          }, error => {
            this.toastr.success('Tạo mới thành công', 'Đăng nhập ', {
              timeOut: 2000,
              extendedTimeOut: 1500
            })
          });
        });
      })
    ).subscribe();
  }

  showPreview(event) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  // getAllRoleUser() {
  //   this.userRoleService.getAllUserRole().subscribe(userRoleList => {
  //     this.userRoles = userRoleList;
  //   });
  // }

  backToList() {
    this.router.navigateByUrl('/management/employee');
  }

  cancel() {
    const action = confirm('Bạn có muốn xóa các thông tin đã nhập');
    if (action === true) {
      this.createEmployeeForm();
    }
  }


}
