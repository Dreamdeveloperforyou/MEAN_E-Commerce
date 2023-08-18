import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/products.service';
import { HomeComponent } from '../../users/home/home.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public sidebarShow: boolean = false;

  currentUserEmail: any;
  currentUserRole: any;

  constructor(private productService: ProductService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUserRole = localStorage.getItem('role');
  }


  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('cart');
    localStorage.removeItem('address');
    this.getCurrentUser();
    this.router.navigateByUrl('auth/login');
  }
  b(){  this.router.navigate(['/user/addToCart']);   }
  signUp() { this.router.navigateByUrl('auth/sign-up'); }
  login() { this.router.navigateByUrl('auth/login'); }
  myOrg() { this.router.navigateByUrl('user/displayCategory'); }

  openDialog(): void {
    this.dialog.open(HomeComponent, {
      width: '250px',
      height: '300px',
      position: { right: '20px', top: '50px' }
    });
  }
}

/*

export class NavbarComponent implements OnInit {

  currentUserRole: any;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token = helper.decodeToken(localStorage.getItem('token') || '');
    if (token) {
      this.currentUserRole = token.role;
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  updateProfile() {
    this.router.navigate(['/user/updateProfile']);
  }

  openDialog(): void {
    this.dialog.open(HomeComponent, {
      width: '250px',
      height: '300px',
      position: { right: '20px', top: '50px' }
    });
  }

*/