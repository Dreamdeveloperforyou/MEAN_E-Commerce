import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,   public dialogRef: MatDialogRef<HomeComponent>,) { }

  myProfile(){
    this.router.navigate(['/user/profile']);
    this.dialogRef.close();
  }

  addAddress() {
    this.router.navigate(['/user/addShippingAddress']);
    this.dialogRef.close();
  }

  myOrder() {
    this.router.navigate(['/user/myOrder']);
    this.dialogRef.close();

  }

  myWishList() {
    this.router.navigate(['/user/wishList']);
    this.dialogRef.close();
  }
}