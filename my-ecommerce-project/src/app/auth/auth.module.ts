import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    LoginComponent, SignUpComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule
  ]
})
export class AuthModule { }
