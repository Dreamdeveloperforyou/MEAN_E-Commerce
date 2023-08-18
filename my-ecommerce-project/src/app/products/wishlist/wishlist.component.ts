import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  currentUser: any;
  wishList: any = [];

  constructor(private wishListService: WishlistService,  private router: Router ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getWishList();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  getUserId() {
    let user_id;
    if (this.currentUser) {
      user_id = this.currentUser;
    } else {
      user_id = environment.data[2].ip;
    }
    return user_id;
  }


  getWishList() {    
    let user_id = this.getUserId();
    // console.log('user',user_id);    
    this.wishListService.getWishlist({ user: user_id}).subscribe(      
      (res) => {
        console.log("res",res);
        if (res.data) {
          this.wishList = res.data;
        }
      }, (error) => {
        console.log(error);
      }
    );
  }


  removeWishlist(val: any) {
    let user_id = this.getUserId();
    this.wishListService.removeWishlist({ user: user_id, variant_id: val._id }).subscribe(
      (res) => {
        this.getWishList();
      }, (error) => {
        console.log(error);
      }
    );
  }


  // buyNow(val: any) {
  //   let user_id = this.getUserId();
  //   val.user = user_id;
  //   val.qty = 1;
  //   if (!localStorage.getItem('cart')) {
  //     let cart = [];
  //     cart.push(val);
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   } else {
  //     let cart = JSON.parse(localStorage.getItem('cart') || '');
  //     const found = cart.some((el: any) => el._id == val._id);
  //     if (!found) {
  //       cart.push(val);
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     } else {
  //       var index = 0;
  //       for (var i = 0; i < cart.length; i++) {
  //         if (cart[i]._id == val._id) { index = i; break; }
  //       }
  //       cart[index].qty = cart[index].qty + 1;
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     }
  //   }
  //   if (this.currentUser) {
  //     this.router.navigate(['/user/checkout']);
  //   }
  //   else { 
  //   this.router.navigate(['/user/checkout']);
  //   }
  // }

}