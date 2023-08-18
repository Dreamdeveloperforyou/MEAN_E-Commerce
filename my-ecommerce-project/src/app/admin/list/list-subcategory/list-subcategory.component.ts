import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.scss']
})
export class ListSubcategoryComponent implements OnInit {

  categories: any = [];
  subCategories: any = [];

  showForm: boolean = false;
  subcategoryForm: any = {
    _id: '',
    name: '',
    category_image: ''
  };

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategoryTree().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeCategory(event: any, i: number) {
    const id = event.target.value;
    if (i == -1) {
      this.showForm = false;
      this.subCategories = [];
    } else {
      this.categoryService.CategoryById({ categoryId: id }).subscribe(
        (res) => {
          this.subcategoryForm = res.data;
          this.showSubcategoryForm();
        }, (error) => {
          console.log(error);
        }
      );
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
    );
  }

  showSubcategoryForm() {
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.subCategories = [];
    this.getCategories();
  }

  onSubmit() {
    // this.categoryService.updateSubCategory(this.subcategoryForm).subscribe(
    //   (res) => {
    //     this.hideForm();
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
  }

}