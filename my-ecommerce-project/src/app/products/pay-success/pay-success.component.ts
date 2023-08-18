import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/products/products.service';
import { ShippingAddressService } from 'src/app/services/shipping-address/shipping-address.service';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {

  currentUser:any;
  shippingAddress:any = [];
  constructor(private productService:ProductService,private orderService:OrderService,private router:Router, private shippingAddressService:ShippingAddressService) { }

  ngOnInit(): void {
  this.getCurrentUser();
  this.getShippingAddress();
  }

  getCurrentUser() {
      this.currentUser = localStorage.getItem('user');
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.shippingAddressService.getdefaultAddress({ user: this.currentUser }).subscribe(
        (res) => {
          this.shippingAddress = res.data;
          console.log('shsssssssss', this.shippingAddress);
          this.orderSave();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      if (localStorage.getItem('address')) {
        let array = [];
        array.push(JSON.parse(localStorage.getItem('address') || ''));
        this.shippingAddress = array;
      }
    }
  }
  
 orderSave() {
    if (this.currentUser) {
      if (localStorage.getItem('cart')) {
        let product = JSON.parse(localStorage.getItem('cart') || '');
        console.log('gggg', product);
        console.log('shippping Address', this.shippingAddress);

        this.orderService.saveOrder({ product: product, user: this.shippingAddress[0].user, shippingAddress: this.shippingAddress[0]._id }).subscribe(
          (res) => {
            localStorage.removeItem('cart');
            localStorage.removeItem('address');
          }, (error) => {
            console.log(error);
          }
        );
      } else {
        this.router.navigate(['/user/displayCategory']);
      }
    } else {
      if (localStorage.getItem('address')) {
        let address = JSON.parse(localStorage.getItem('address') || '');
        this.shippingAddressService.addShippingAddress(address).subscribe(
          res => {
            
          }, error =>
          console.log(error)
        );
      } else {
        this.router.navigate(['/user/displayCategory']);
      }
    }
  }


}
