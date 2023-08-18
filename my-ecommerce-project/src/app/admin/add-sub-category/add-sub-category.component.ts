import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  subCategoryForm: any;
  categories: any;
  subCategories: any = [];
  selectedProductFile: any;
  selectedCategory: any;

  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }


  ngOnInit(): void {
    this.getCategories();
    this.Form();
  }

  Form() {
    this.subCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      parent_id: new FormControl('', Validators.required),
      // subCategory_image: new FormControl('', Validators.required),
  
    });
  }



  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  };



  onChange(event: any, i: number) {
    const id = event.target.value;
    if (i == -1) {
      this.subCategories = [];
    }
    this.subCategories.splice(i + 1);
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.subCategories.push(res.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }



  onSubmit() {
    console.log('submit', this.subCategoryForm.value);

    this.categoryService.addCategory(this.subCategoryForm.value).subscribe(
      (res) => {
        this.subCategories = [];
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    );
  }


  getSelectedCategory(category: any) {
    this.selectedCategory = category;
  }
  
  onSelectedColourFile(event: any) {
    const file = event.target.files[0];
    console.log('files', file);
    this.selectedProductFile = event.target.files[0];
  }
}

