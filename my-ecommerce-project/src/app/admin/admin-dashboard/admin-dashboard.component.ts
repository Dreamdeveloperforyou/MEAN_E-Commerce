import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  currentUserRole: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUserRole = localStorage.getItem('role');
    if (this.currentUserRole != 0) {
      this.router.navigate(['/user/display-product']);
    }
  }

  b(){  this.router.navigate(['/user/addToCart']);   }
      
}  
