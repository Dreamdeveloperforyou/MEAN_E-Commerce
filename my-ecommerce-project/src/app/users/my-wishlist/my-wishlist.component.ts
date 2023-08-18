import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/app/environment/environment';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent {

    currentUser: any;
    wishList: any = [];
    
    constructor(private wishListService: WishlistService) { }
  
    ngOnInit(): void {
      this.getCurrentUser();
      this.getWishList();
    }
  
    getCurrentUser() {
      const helper = new JwtHelperService();
      const token = helper.decodeToken(localStorage.getItem('token') || '');
      if (token) {
        this.currentUser = token.user;
      }
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
      this.wishListService.getWishlist({ user: user_id }).subscribe(
        (res) => {
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
}
