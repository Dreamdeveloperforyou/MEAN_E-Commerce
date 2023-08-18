import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/products/products.service';
import { PromocodeService } from 'src/app/services/promo/promocode.service';
import { ShippingAddressService } from 'src/app/services/shipping-address/shipping-address.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent implements OnInit {

  paymentHandler: any = null;
  currentUser: any;
  productData: any;
  shippingAddress: any;
  total: number = 0;
  cart: any = [];
  subTotal: number = 0;
  taxes: number = 0;
  promocode: any;
  discount: any;

  constructor(private router: Router, private productService: ProductService, private orderService: OrderService, private shippingService: ShippingAddressService, private promocodeService: PromocodeService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getShippingAddress();
    this.returnTotal();
    // this.productData = JSON.parse(localStorage.getItem('cart') || '');
    this.getCurrentUser();
    this.getCart();
    this.getShippingAddress();
    this.returnSubTotalAmount();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');   
  }
  getCart() {
    if (localStorage.getItem('cart')) {
      this.productData = JSON.parse(localStorage.getItem('cart') || '');
    }
  }


  buy() {  
    this.productService.makePayment({ amount: this.total }).subscribe(
      (res) => {
        console.log('res', res);
        window.location.href = res.url;
      }, (error) => {
        console.log(error);
      }
    )
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.shippingService.getdefaultAddress({ user: this.currentUser }).subscribe(
        (res) => {
          this.shippingAddress = res.data;
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

  editBtn() { this.router.navigate(['/user/checkout'], { queryParams: { action: 'E' } }); }
  back() { this.router.navigate(['/user/shippingAddress']); }


  returnTotal() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      for (let i = 0; i < cart.length; i++) {
        this.total += cart[i].price * cart[i].qty;
      }
    }
  }


  returnSubTotalAmount() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      console.log('cart',cart );
      
      for (let i = 0; i < cart.length; i++) {
        
        this.subTotal += cart[i].price * cart[i].qty;

        console.log('total',this.total);
        let taxAmount = (cart[i].price * cart[i].tax) / 100;
        console.log('taxAmount',taxAmount);
        
        this.taxes += taxAmount * cart[i].qty;
  }
    this.total = this.subTotal + this.taxes;
    }
  }

  applyPromocode() {
    if (this.currentUser) {
      this.promocodeService.applyPromocode({ user: this.currentUser, promocode: this.promocode }).subscribe(
        res => {
          console.log('res', res);
          if (res.data) {
            console.log('total', this.total);
            this.discount = (this.total * res.data) / 100;
            console.log('total1', this.total);
            console.log('discount', this.discount);

            this.total = this.total - this.discount;
            console.log('total2', this.total);
          }
        }, error => console.log(error)
      );
    }
  }


  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N2pSMSEsz94il2uKSb0bh1sNX6EvL2otUrfDdXaqWocdbrLComG22aqGjXeDCpeH1ob0Wq0AXLCGOHnLFdTdEkF00EICybkLp',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.productService.makePayment(stripeToken).subscribe(
        (res) => {
          console.log(res);
        }, (error) => {
          console.log(error);
        }
      )
    }

    paymentHandler.open({
      name: 'Raja',
      description: 'stripe payment',
      amount: amount * 100
    })
  }

  home() { localStorage.removeItem('cart'); localStorage.removeItem('address'); this.router.navigateByUrl('user/displayCategory'); }

}