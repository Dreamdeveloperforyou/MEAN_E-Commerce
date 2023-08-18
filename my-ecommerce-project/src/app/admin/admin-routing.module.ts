import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavComponent } from '../layout/nav/nav.component';
import { AddVariantComponent } from './add-variant/add-variant.component';
import { AddSubcategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';
import { AddToCartComponent } from '../products/add-to-cart/add-to-cart.component';
import { DisplayCategoryComponent } from '../products/display-category/display-category.component';
import { DisplayProductComponent } from '../products/display-product/display-product.component';
import { ListCategoryComponent } from './list/list-category/list-category.component';
import { ListSubcategoryComponent } from './list/list-subcategory/list-subcategory.component';
import { ListProductComponent } from './list/list-product/list-product.component';
import { ListVariantComponent } from './list/list-variant/list-variant.component';
import { ListAttributeComponent } from './list/list-attribute/list-attribute.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { ListPromoCodeComponent } from './list/list-promo-code/list-promo-code.component';
import { TaxComponent } from './tax/tax.component';
import { ListTaxComponent } from './list/list-tax/list-tax.component';

const appRoutes: Routes = [
    {
        path: '', component: NavComponent, children: [
            {
                path: 'admin-dashboard', component: AdminDashboardComponent, children: [
                    { path: '', component: DisplayCategoryComponent },
                    { path: 'add-category',     component: AddCategoryComponent         },
                    { path: 'add-product',      component: AddProductComponent          },
                    { path: 'add-variant',      component: AddVariantComponent          },
                    { path: 'product',          component: DisplayCategoryComponent     },
                    { path: 'display-product',  component: DisplayProductComponent      },
                    { path: 'add',              component: AddToCartComponent           },
                    { path: 'add-sub',          component: AddSubcategoryComponent      },
                    { path: 'variant-att',      component: AddVariantAttributeComponent },
                    { path: 'listCategory',     component: ListCategoryComponent,       },
                    { path: 'listSubCategory',  component: ListSubcategoryComponent,    },
                    { path: 'listProduct',      component: ListProductComponent,        },
                    { path: 'listVariant',      component: ListVariantComponent,        },
                    { path: 'listAttribute',    component: ListAttributeComponent,      },
                    { path: 'promocode',        component: PromoCodeComponent           },
                    { path: 'givePromocode',    component: ListPromoCodeComponent       },
                    { path: 'tax',              component: TaxComponent                 },
                    { path: 'applyTax',         component: ListTaxComponent             },
                ]
            },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }