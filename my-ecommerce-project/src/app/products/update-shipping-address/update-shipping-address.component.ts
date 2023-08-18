import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShippingAddressService } from 'src/app/services/shipping-address/shipping-address.service';

@Component({
  selector: 'app-update-shipping-address',
  templateUrl: './update-shipping-address.component.html',
  styleUrls: ['./update-shipping-address.component.scss']
})
export class UpdateShippingAddressComponent implements OnInit {

  currentUser: any;
  address: any = {
    _id: '',
    user: '',
    country: '',
    state: '',
    city: '',
    street: '',
    pincode: '',
    phone_number: '',
    type: ''
  };

  constructor(private router: Router, private activateRoute: ActivatedRoute, private addressService: ShippingAddressService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAddress();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    // const token: any = this.authService.getAuthToken();
    // const decoded = helper.decodeToken(token);
    // if (decoded) {
    //   this.currentUser = decoded.user;
    // }
  }

  getAddress() {
    this.activateRoute.queryParams.subscribe(
      (params) => {
        if (params['id']) {
          let id = params['id'];
          this.addressService.getShippingAddressById({ _id: id }).subscribe(
            (res) => {
              this.address = res.data;
            }, (error) => {
              console.log(error);
            }
          );
        }

        if (params['action']) {
          if (localStorage.getItem('address')) {
            this.address = JSON.parse(localStorage.getItem('address') || '');
          } else {
            this.cancel();
          }
        }

        if (!params['id'] && !params['action']) {
          this.cancel();
        }
      }
    );
  }

  updateAddress() {
    if (this.currentUser) {
      this.addressService.updateShippingAddress(this.address).subscribe(
        (res) => {
          this.cancel();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.setItem('address', JSON.stringify(this.address));
      this.cancel();
    }
  }

  cancel() {
    this.router.navigate(['/user/shippingAddress']);
  }

}