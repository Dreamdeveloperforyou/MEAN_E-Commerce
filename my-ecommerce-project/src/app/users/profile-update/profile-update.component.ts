import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  user: any;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.user = params['user'];
      if (!this.user) {
        this.router.navigate(['/user/profile']);
      }
      this.user = JSON.parse(this.user);
    });
  }

  onSubmit() {
    this.userService.updateProfile(this.user).subscribe(
      (res) => {
       this.cancel();      
      }, (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/user/profile']);
  }

}
