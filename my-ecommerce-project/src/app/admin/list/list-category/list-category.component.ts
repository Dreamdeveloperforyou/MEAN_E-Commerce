import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: any = [];
  showForm: boolean = false;
  categoryForm: any = {
    _id: '',
    name: '',
    category_image: ''
  }
  categoryImage: any;

  constructor(private categoryService: CategoryService) { }

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
  }

  onChangeCategory(event: any) {
    let id = event.target.value;
    this.categoryService.CategoryById({ categoryId: id }).subscribe(
      (res) => {
        this.categoryForm = res.data;
        this.showCategoryForm();
      }, (error) => {
        console.log(error);
      }
    );   
  }

  showCategoryForm() {
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.categoryImage = undefined;
    this.getCategories();
  }

  onFileChange(event: any) {
      this.categoryImage = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('_id', this.categoryForm._id);
    formData.append('name', this.categoryForm.name);
    if (this.categoryImage) {
      formData.append('category_image', this.categoryImage);
    } else {
      formData.append('category_image', this.categoryForm.category_image);
    }
    this.categoryService.updateCategory(formData).subscribe(
      (res) => {
        this.hideForm();
      }, (error) => {
        console.log(error);
      }
    );
  }

}
