import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/app/environment/environment';
import { VariantService } from 'src/app/services/variant/variant.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { GuestComponent } from '../guest/guest.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product_id: any;
  currentUser: any;
  allVariant: any = [];
  imageIndex: number = 0;
  variantIndex: number = 0;
  tax:any;
  constructor(public dialog: MatDialog, private variantService: VariantService, private activateRoute: ActivatedRoute, private cartService: CartService, private wishListService: WishlistService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getQueryParams();
    if (this.product_id != undefined) { this.getVariantByProduct(); }
  }

  getCurrentUser() { this.currentUser = localStorage.getItem('user');   /* this.currentUser = localStorage.getItem('user'); */ }

  getUserId() {
    let user_id;
    if   ( this.currentUser ) { user_id = this.currentUser; }
    else { user_id = environment.data[2].ip; }
    return user_id;
  }

  getQueryParams() {
    this.activateRoute.queryParams.subscribe(params => { this.product_id = params['product_id']; });
  }

  openDialog(variantIndex: any): void {
    this.dialog.open(ImageDialogComponent, { width: '1600px', height: '700px', data: { data: this.allVariant, variantIndex: variantIndex } });
  }
  openDialogForGuest(): void {
    this.dialog.open(GuestComponent, { width: '400px', height: '200px' });
  }

  getVariantByProduct() {
    this.variantService.getVariantByProductId({ product_id: this.product_id }).subscribe(
      (res) => {  console.log('rrrr', res);  this.allVariant = res.data;  this.tax = res.tax  },
      (err) => {  console.log('error',err); }
    )
  }

  changeImage(i: any) { this.imageIndex = i; }
  onSelectColour(i: any) { this.variantIndex = i; }

  addToCart(val: any) {
    console.log('tax',this.tax);
    let user_id = this.getUserId();
    val.user = user_id;
    val.qty = 1;
    val.tax = this.tax.tax;
    if (!localStorage.getItem('cart')) {
      let cart = [];
      cart.push(val);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      const found = cart.some((el: any) => el._id == val._id);
      if (!found) {
        cart.push(val);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        var index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]._id == val._id) {
            index = i;
            break;
          }
        }
        cart[index].qty = cart[index].qty + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    this.router.navigate(['/user/addToCart']);
  }

  addWishList(val: any) {
    let user_id = this.getUserId();
    this.wishListService.addWishList({ user: user_id, varinat_id: val._id }).subscribe(
      (res) => {
        this.router.navigate(['/user/wishList']);
      }, (error) => {
        console.log(error);
      }
    );
  }


  buyNow(val: any) {
    console.log('tax',val.tax);
    
    let user_id = this.getUserId();
    val.user = user_id;
    val.qty = 1;
    val.tax = this.tax.tax;
    if (!localStorage.getItem('cart')) {
      let cart = [];
      cart.push(val);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      const found = cart.some((el: any) => el._id == val._id);
      if (!found) {
        cart.push(val);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        var index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]._id == val._id) { index = i; break; }
        }
        cart[index].qty = cart[index].qty + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    if (this.currentUser) {
      this.router.navigate(['/user/checkout']);
    }
    else { this.openDialogForGuest(); }
    this.router.navigate(['/user/checkout']);
  }

}
