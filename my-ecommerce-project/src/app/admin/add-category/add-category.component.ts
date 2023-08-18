import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: any;
  selectedCategoryImage: any;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category_image: new FormControl('', Validators.required),
      parent_id: new FormControl(null),
    });
  } 

  onSelectedColourFile(event: any) {
    const file = event.target.files[0];
    console.log('files', file);
    this.selectedCategoryImage = event.target.files[0];
  }

  onSubmit() {
    // console.log('data',this.categoryForm.value);
    const formData = new FormData();
    formData.append('name', this.categoryForm.get('name').value);
    formData.append('category_image',this.selectedCategoryImage);
    this.productService.addCategory(formData).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    )
  }

}

