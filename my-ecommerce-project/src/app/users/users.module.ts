import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShippingAddressAddComponent } from './shipping-address-add/shipping-address-add.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, ShippingAddressAddComponent, MyOrdersComponent, MyWishlistComponent, ProfileComponent, ProfileUpdateComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule, FormsModule
  ]
})
export class UsersModule { }
