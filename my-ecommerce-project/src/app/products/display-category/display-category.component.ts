import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.scss']
})
export class DisplayCategoryComponent implements OnInit {

  categories: any = [];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }
   

  getCategories() {
    this.categoryService.getCategory().subscribe(  
      (res) => {   this.categories = res.data;      },
      (error) => {   console.log(error);      }
    );
  };


  onSelectedCategory(event: any) {
    this.router.navigate(['/user/display-product'], { queryParams: { category_id: event._id } });
  }
 
}
 