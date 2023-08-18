import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  categories: any = [];
  subCategories: any = [];
  subCategories1: any = [];
  Products: any = [];

  showForm: boolean = false;
  productForm: any = {
    _id: '',
    name: '',
    category_id: '',
    subCategory_id: '',
    description: '',
    product_image: '',
  }
  selectedImage: any;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  };

  getProducts(event: any) {
    const _id = event.target.value;
    this.productService.getProductByCatId({ category_id: _id }).subscribe(
      (res) => {
        this.Products = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeProduct(event: any) {
    let productId = event.target.value;
    this.productService.getProductByProductId({ _id: productId }).subscribe(
      (res) => {
        this.productForm = res.data;
        this.showProductForm();
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeCategory(event: any) {
    this.productForm.category_id = event.target.value;
    this.categoryService.getCategoryById({ parent_id: this.productForm.category_id }).subscribe(
      (res) => {
        this.subCategories1 = [];
        this.subCategories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeSubcategory(event: any, i: number) {
    this.productForm.subCategory_id = event.target.value;
    if (i == -1) {
      this.subCategories1 = [];
    }
    this.subCategories1.splice(i + 1);
    this.categoryService.getCategoryById({ parent_id: this.productForm.subCategory_id }).subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.subCategories1.push(res.data);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  showProductForm() {
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.selectedImage = undefined;
    this.Products = [];
    this.getCategories();
  }

  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    console.log('submit', this.productForm);
    const formData = new FormData();
    formData.append('_id', this.productForm._id);
    formData.append('name', this.productForm.name);
    formData.append('category_id', this.productForm.category_id);
    formData.append('subCategory_id', this.productForm.subCategory_id);
    formData.append('description', this.productForm.description);
    if (this.selectedImage) {
      formData.append('product_image', this.selectedImage);
    } else {
      formData.append('product_image', this.productForm.product_image);
    }
    this.productService.updateProducts(formData).subscribe(
      (res) => {
        this.hideForm();
      }, (error) => {
        console.log(error);
      }
    );
  }

}


