import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../../../service/employee/employee.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
import {UserRole} from "../../../../model/account/role";
import {UserService} from "../../../../service/user/user.service";
import {UserRoleService} from "../../../../service/user/user-role.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  userForm: FormGroup;
  userRoles: [UserRole];
  selectedUserRole: UserRole;
  selectedImage: string[];
  urlImage: string[] = [];

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private storage: AngularFireStorage,
              private router: Router) {
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
      employeePhone: new FormControl(''),
      employeeAddress: new FormControl(''),
      employeeImage: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    });
  }

  saveEmployee() {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
      alert('Tạo nhân viên thành công');
    }, error => {
      alert('Tạo nhân viên thất bại');
    });
  }

  submit() {
    // this.saveUser();
    this.saveEmployee();
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

  // getAllRoleUser() {
  //   this.userRoleService.getAllUserRole().subscribe(userRoleList => {
  //     this.userRoles = userRoleList;
  //   });
  // }

  backToList() {
    this.router.navigateByUrl('/employee')
  }

  cancel() {
    const action = confirm('Bạn có muốn xóa các thông tin đã nhập');
    if (action == true) {
      this.createEmployeeForm();
    }
  }

}
