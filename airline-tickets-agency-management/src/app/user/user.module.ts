import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './user-component/login/login.component';
import { RegisterComponent } from './user-component/register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
