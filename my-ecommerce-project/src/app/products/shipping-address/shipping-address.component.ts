import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { ProductService } from 'src/app/services/products/products.service';
import { ShippingAddressService } from 'src/app/services/shipping-address/shipping-address.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html', 
  styleUrls: ['./shipping-address.component.scss']
})

export class ShippingAddressComponent implements OnInit {

  addressForm: any;
  currentUser: any;
  userId: any;
  showForm: boolean = false;
  shippingAddress: any = [];

  constructor(public dialog: MatDialog, private router: Router, private productService: ProductService, private addressService: ShippingAddressService) { } 
  ngOnInit() {
    this.getCurrentUser();
    this.getUserId();
    this.getAddressForm();
    this.getShippingAddress();
    if (!this.currentUser && this.shippingAddress.length < 1) {
      this.showForm = true;
    }
    
  }

  getCurrentUser() {
  this.currentUser = localStorage.getItem('user');
  }

  getUserId() {
      if (this.currentUser) { 
      this.userId = this.currentUser;
    } else {
      this.userId = environment.data[3].ip;
    }
  }

  getAddressForm() {
    this.addressForm = new FormGroup({
      user: new FormControl(this.userId, Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      type: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.currentUser) {
      this.addressService.addShippingAddress(this.addressForm.value).subscribe(
        (res) => {
          this.hideForm();
          this.getShippingAddress();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.setItem('address', JSON.stringify(this.addressForm.value));
      this.hideForm();
      this.getShippingAddress();
    }
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.addressService.getShippingAddress({ user: this.currentUser }).subscribe(
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
      } else {
        this.shippingAddress = [];
      }
    }
  }

  editAddress(event: any) {
    if (this.currentUser) {
      this.router.navigate(['/user/updateShippingAddress'], { queryParams: { id: event } });
    } else {
      if (localStorage.getItem('address')) {
        this.router.navigate(['/user/updateShippingAddress'], { queryParams: { action: 'edit' } });
      }
    }
  }

  deleteAddress(event: any) {
    if (this.currentUser) {
      let wantDelete = confirm('Are you sure?');
      if (!wantDelete) {
        return;
      }
      this.addressService.deleteShippingAddress(event).subscribe(
        (res) => {
          this.getShippingAddress();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.removeItem('address');
      this.getShippingAddress();
      this.showForm = true;
    }
  }

  showAddressForm() {
    this.getAddressForm();
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
  }

  back() {
    this.router.navigate(['/user/checkout']);
  }

  next() {
    this.router.navigate(['/user/purchase']);
  }

  setDefaultAddress(event: any) {
    if (this.currentUser) {
      this.addressService.setDefaultShippingAddress({ _id: event._id, user: event.user }).subscribe(
        (res) => {
          console.log('done');
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  
}



/*   ngOnInit() {
     this.getCurrentUser();




   getCurrentUser() {
     this.currentUser = localStorage.getItem('user');
   }


   Form() {
     this.addressForm = new FormGroup({
       user: new FormControl(this.userId, Validators.required),
       country: new FormControl('', Validators.required),
       state: new FormControl('', Validators.required),
       city: new FormControl('', Validators.required),
       street: new FormControl('', Validators.required),
       pincode: new FormControl('', Validators.required),
    // phone_number: new FormControl('', Validators.required),
       phone_number: new FormControl('',[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
       type: new FormControl('',Validators.required),

     });
   }


   onSubmit() {
     localStorage.setItem("address", JSON.stringify(this.addressForm.value));
     this.router.navigate(['/user/purchase']);
     console.log('adres',this.addressForm.value);
   }
*/