import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: any;
  message!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required])
    });
  };


  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (res) => {
        this.router.navigate(['/auth/login']);
      }, (err) => {
        console.log(err.message);
      }
    );
  };

}