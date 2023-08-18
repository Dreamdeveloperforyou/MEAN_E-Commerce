import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  message!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  };


  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) =>  {
        
        const helper = new JwtHelperService();
        const token = helper.decodeToken(res.token);
        console.log(res.token);
        
        // localStorage.setItem('user',token.email);
        localStorage.setItem('user',token.user);
        localStorage.setItem('role',token.role);  
        if(token.role == 0){
          this.router.navigate(['/admin/admin-dashboard']);
        } else{
          this.router.navigate(['/user/displayCategory']);
        }     
      },(err) => {
        console.log(err);
      }
    );
  };

}