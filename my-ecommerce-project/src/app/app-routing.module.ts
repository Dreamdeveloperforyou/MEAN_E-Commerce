import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './users/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { GuestComponent } from './products/guest/guest.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MyOrdersComponent } from './users/my-orders/my-orders.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { PurchaseComponent } from './products/purchase/purchase.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';
import { PayCancelComponent } from './products/pay-cancel/pay-cancel.component';
import { MyWishlistComponent } from './users/my-wishlist/my-wishlist.component';
import { AddToCartComponent } from './products/add-to-cart/add-to-cart.component';
import { PaySuccessComponent } from './products/pay-success/pay-success.component';
import { ImageDialogComponent } from './products/image-dialog/image-dialog.component';
import { OrderDetailComponent } from './products/order-detail/order-detail.component';
import { QuickSignUpComponent } from './products/quick-sign-up/quick-sign-up.component';
import { SearchResultComponent } from './products/search-result/search-result.component';
import { DetailProductComponent } from './products/detail-product/detail-product.component';
import { DisplayProductComponent } from './products/display-product/display-product.component';
import { DisplayCategoryComponent } from './products/display-category/display-category.component';
import { ShippingAddressComponent } from './products/shipping-address/shipping-address.component';
import { ShippingAddressAddComponent } from './users/shipping-address-add/shipping-address-add.component';
import { UpdateShippingAddressComponent } from './products/update-shipping-address/update-shipping-address.component';
import { ProfileUpdateComponent } from './users/profile-update/profile-update.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth', component: NavComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'display-product', component: DisplayProductComponent },
      // { path: 'home', component: HomeComponent },
    ]
  },
  {
    path: 'user', component: NavComponent, children: [
      { path: 'updateProfile', component: ProfileUpdateComponent },
      { path: 'home', component: HomeComponent },
      { path: 'guest', component: GuestComponent },
      { path: 'cancel', component: PayCancelComponent },
      { path: 'profile', component: ProfileComponent, },
      { path: 'wishList', component: WishlistComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'order', component: OrderDetailComponent },
      { path: 'myOrder', component: MyOrdersComponent, },
      { path: 'success', component: PaySuccessComponent },
      { path: 'addToCart', component: AddToCartComponent },
      { path: 'myWishlist', component: MyWishlistComponent, },
      { path: 'quickSignUp', component: QuickSignUpComponent },
      { path: 'imageDialog', component: ImageDialogComponent },
      { path: 'searchResult', component: SearchResultComponent },
      { path: 'productDetail', component: DetailProductComponent },
      { path: 'display-product', component: DisplayProductComponent },
      { path: 'shippingAddress', component: ShippingAddressComponent },
      { path: 'displayCategory', component: DisplayCategoryComponent },
      { path: 'addShippingAddress', component: ShippingAddressAddComponent, },
      { path: 'updateShippingAddress', component: UpdateShippingAddressComponent },
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: LoginComponent }
];


// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }