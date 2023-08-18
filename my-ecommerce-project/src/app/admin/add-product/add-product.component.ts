import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

  productForm: any;
  categories: any;
  subCategories: any = [];
  subCategories1: any = [];
  selectedFile: any;
  selectedProductFile:any;
  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.Form();
  };
                                                                                      

  Form() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      subCategory_id: new FormControl(null),
      description: new FormControl('', Validators.required),
      product_image: new FormControl('', Validators.required),

    });
  }


  onSelectedProductFile(event: any) {
    const file = event.target.files[0];
    console.log('files', file);
    this.selectedProductFile = event.target.files[0];
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name').value);
    formData.append('category_id', this.productForm.get('category_id').value);
    formData.append('subCategory_id', this.productForm.get('subCategory_id').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('product_image',this.selectedProductFile);

    this.productService.addProduct(formData).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    );
  };



  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res.data;
        console.log('acta',this.categories);        
      }, (error) => {
        console.log(error);
      }
    );
  };



  getSubcategories(event: any) {
    const id = event.target.value;
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        console.log('res1',res);        
        if (this.subCategories1.length > 0) {
          this.subCategories1 = [];
        }
        this.subCategories = res.data;        
      }, (error) => {
        console.log(error);
      }
    )
  }

  onChange(event: any, i: number) {
    const id = event.target.value;
    if (i == -1) {
      this.subCategories1 = [];
    }
    this.subCategories1.splice(i + 1);
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        console.log('res2',res);
        if (res.data.length > 0) {
          this.subCategories1.push(res.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  
}
