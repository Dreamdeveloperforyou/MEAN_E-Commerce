import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
}) 
export class AddToCartComponent implements OnInit {
  currentUser: any;
  cart: any = [];
  total: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCartData();
    this.returnTotal();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  getCartData() {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '');
    } else {
      this.cart = [];
    }
  }


  increaseCart(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.returnTotal();
    this.getCartData();    
  }


  decreaseCart(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty - 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.returnTotal();
    this.getCartData();    
  }


  removeCart(val: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    var index = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]._id == val._id) {
        index = i;
        break;
      }
    }
    cart.splice(index, 1);
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.returnTotal();
      this.getCartData();
    } else {
      localStorage.removeItem('cart');
      this.getCartData();
    }
  }


  returnTotal() {
    if(localStorage.getItem('cart')){
    let cart = JSON.parse(localStorage.getItem('cart') || '');   
      this.total =0;
      for (let i = 0; i < cart.length; i++) {
        this.total += cart[i].price * cart[i].qty;
      }
    } 
  }

  
  proceedToBuy() {
    this.router.navigate(['/user/checkout']);
  }
}