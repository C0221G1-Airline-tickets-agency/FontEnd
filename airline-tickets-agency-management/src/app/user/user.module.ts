import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginRegisterComponent } from './user-component/login-register/login-register.component';



@NgModule({
  declarations: [LoginRegisterComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
