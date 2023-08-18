import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-quick-sign-up',
  templateUrl: './quick-sign-up.component.html',
  styleUrls: ['./quick-sign-up.component.scss']
})
export class QuickSignUpComponent {
  quickSignUpForm: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.quickSignUpForm = new FormGroup({
      phone_number: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    for (let i = 0; i < environment.data.length; i++) {
      if (environment.data[i].phone_number == this.quickSignUpForm.get('phone_number').value) {
        this.authService.quickSignup(this.quickSignUpForm.value).subscribe(
          (res) => {
            if (res.success) {
              let data = res.data;
              for (let i = 0; i < environment.data.length; i++) {
                if (environment.data[i].phone_number == data.phone_number) {
                  localStorage.setItem('user', data._id);
                  this.ipToUserID(environment.data[i].ip, data._id);
                  break;
                }
              }
            }
          }, (error) => {
            console.log(error);
          }
        );
        break;
      } 
    }
  }


  ipToUserID(ip: any, user: any) {
    this.userService.ipToUserID({ ip: ip, user: user }).subscribe(
      (res) => {
        this.router.navigate(['/user/checkout']);
      }, (error) => {
        console.log(error);
      }
    );
  }
  
}
