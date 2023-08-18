import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {

  products: any = [];
  category_id: any;
  constructor(private productService: ProductService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(
      (params) => { this.category_id = params['category_id']; }
    )
    if (this.category_id != undefined) {
      this.getProductsByCategory();
    }
  };
  
  
  onSelectedCategory(event: any) {
    this.router.navigate(['/user/productDetail'], { queryParams: { product_id: event._id } });
  }    
 

  getProductsByCategory() {
    this.productService.getProductByCatId({ category_id: this.category_id }).subscribe(
      (res) => {
        this.products = res.data;
      }, (error) => {
        console.log(error);        
      }
    )
  }

  
}


