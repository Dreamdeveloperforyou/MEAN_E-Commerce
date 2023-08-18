import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayProductComponent } from './display-product/display-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { GuestComponent } from './guest/guest.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayCancelComponent } from './pay-cancel/pay-cancel.component';
import { QuickSignUpComponent } from './quick-sign-up/quick-sign-up.component';
import { UpdateShippingAddressComponent } from './update-shipping-address/update-shipping-address.component';

@NgModule({
  declarations: [
    DisplayProductComponent, DetailProductComponent, ImageDialogComponent, AddToCartComponent, DisplayCategoryComponent, SearchResultComponent, WishlistComponent, PurchaseComponent, GuestComponent, OrderDetailComponent, CheckoutComponent, ShippingAddressComponent, PaySuccessComponent, PayCancelComponent, QuickSignUpComponent, UpdateShippingAddressComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, FormsModule,

  ],
  exports: [
    DisplayProductComponent, DetailProductComponent, ImageDialogComponent, AddToCartComponent, DisplayCategoryComponent, SearchResultComponent, WishlistComponent,
  ]
})
export class ProductsModule { }
/*
 DisplayProductComponent,
    ProductDetailComponent,
    ImageDialogComponent,
    SearchResultComponent,
    AddToCartComponent,
    DisplayCategoryComponent,
    WishlistComponent,
    PurchaseComponent,
    OrderDetailComponent,
    GuestComponent,
    QuickSignupComponent,
    CheckoutComponent,
    ShippingAddressComponent,
*/