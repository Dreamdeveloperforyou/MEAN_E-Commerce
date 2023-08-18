import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddVariantComponent } from './add-variant/add-variant.component';
import { AddSubcategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { ListAttributeComponent } from './list/list-attribute/list-attribute.component';
import { ListCategoryComponent } from './list/list-category/list-category.component';
import { ListProductComponent } from './list/list-product/list-product.component';
import { ListSubcategoryComponent } from './list/list-subcategory/list-subcategory.component';
import { ListVariantComponent } from './list/list-variant/list-variant.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { ListPromoCodeComponent } from './list/list-promo-code/list-promo-code.component';
import { TaxComponent } from './tax/tax.component';
import { ListTaxComponent } from './list/list-tax/list-tax.component';


@NgModule({
  declarations: [
    AdminDashboardComponent, AddProductComponent,
    AddCategoryComponent, AddVariantComponent,
    AddSubcategoryComponent, AddVariantAttributeComponent,
    ListAttributeComponent, ListCategoryComponent,
    ListProductComponent, ListSubcategoryComponent,
    ListVariantComponent,
    PromoCodeComponent,
    ListPromoCodeComponent,
    TaxComponent,
    ListTaxComponent
  ],
  imports: [
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [
    AdminDashboardComponent,
    AddProductComponent,
    AddCategoryComponent,
    AddVariantComponent,
    AddSubcategoryComponent,
    AddVariantAttributeComponent
  ]
})

export class AdminModule { }

