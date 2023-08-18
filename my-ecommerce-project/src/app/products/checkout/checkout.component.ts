import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  purchaseData: any = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getParam();
    this.purchaseData = JSON.parse(localStorage.getItem('cart') || '');
    if (!this.purchaseData) {
      this.router.navigate(['/user/displayCategory']);
    }
  }

  add() { this.router.navigate(['/user/shippingAddress']); }

  increaseQuantity(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.ngOnInit();
  }


  decreaseQuantity(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty - 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.ngOnInit();
  }


  removeProduct(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart.splice(i, 1);
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.ngOnInit();
    } else {
      localStorage.removeItem('cart');
      this.router.navigate(['/user/displayCategory']);
    }
  }


  getParam() {
    let editAddress;
    this.activateRoute.queryParams.subscribe((params) => { editAddress = params['action']; });
    if (editAddress) {
      console.log('if');
      let cart = JSON.parse(localStorage.getItem('cart') || '');
    }
  }


}