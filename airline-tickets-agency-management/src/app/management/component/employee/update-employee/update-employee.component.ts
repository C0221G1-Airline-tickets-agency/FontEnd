import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AddRequest} from '../../../../model/employee/add-request';
import {EmployeeService} from '../../../../service/employee/employee.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../service/user/user.service';
import {UserRoleService} from '../../../../service/user/user-role.service';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: AddRequest;
  selectedId = 4;
  selectedImage: string[];
  urlImage: string[] = [];

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private storage: AngularFireStorage,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.getEmployee();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      console.log(param.get('id'));
      }
    );

  }

  getEmployee() {
    this.employeeService.getEmployee(this.selectedId).subscribe(data => {
      this.employee = data;
      this.createEmployeeForm();
    }, error => {
      alert('Kiểm tra lại danh sách nhân viên');
    });
  }

  createEmployeeForm() {
    this.employeeForm = new FormGroup({
      employeeCode1: new FormControl(this.employee.employeeCode),
      employeeName1: new FormControl(this.employee.employeeName),
      employeeBirthday1: new FormControl(this.employee.employeeBirthday),
      employeeGender1: new FormControl(this.employee.employeeGender),
      employeePhone1: new FormControl(this.employee.employeePhoneNumber),
      employeeAddress1: new FormControl(this.employee.employeeAddress),
      employeeImage1: new FormControl(this.employee.employeeImage),
      username1: new FormControl(this.employee.username),
      password1: new FormControl(this.employee.password),
      role1: new FormControl(this.employee.role)
    });
  }

  saveEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value, this.selectedId).subscribe(() => {
      alert('Đã chỉnh sửa thành công nhân viên');
    }, error => {
      alert('Chỉnh sửa thất bại');
    });
  }

  submit() {
    // this.saveUser();
    if (confirm('Bạn có muốn chỉnh sửa nhân viên này không?')) {
      this.saveEmployee();
    }
  }

  uploadFile(imageFile) {
    const nameImg = this.getCurrentDateTime() + imageFile.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.urlImage.push(url);
        });
      })
    ).subscribe();
  }

  showPreview(event) {
    this.selectedImage = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage.push(e.target.result);
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      }
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

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
