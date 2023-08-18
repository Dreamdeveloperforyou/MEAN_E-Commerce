import { Component, OnInit } from '@angular/core';
import { AttributeService } from 'src/app/services/attribute/attribute.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/products/products.service';
import { VariantService } from 'src/app/services/variant/variant.service'; 

@Component({
  selector: 'app-list-attribute',
  templateUrl: './list-attribute.component.html',
  styleUrls: ['./list-attribute.component.scss']
})
export class ListAttributeComponent implements OnInit {

  categories: any = [];
  products: any = [];
  variants: any = [];
  attributes: any = [];

  showForm: boolean = false;
  attributeForm = {
    _id: '',
    variant_id: '',
    size: ''
  }

  constructor(private categoryService: CategoryService, private productService: ProductService, private variantService: VariantService, private attributeService: AttributeService) { }

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
    const _id = event.target.value;
    this.productService.getProductByCatId({ category_id: _id }).subscribe(
      (res) => {
        this.products = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeProduct(event: any) {
    const _id = event.target.value;
    this.variantService.getVariantByProductId({ product_id: _id }).subscribe(
      (res) => {
        this.variants = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeVariant(event: any) {
    const _id = event.target.value;
    this.attributeService.getAttributeByVariantId({ _id: _id }).subscribe(
      (res) => {
        this.attributes = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onChangeAttribute(event: any) {
    const _id = event.target.value;
    this.attributeService.getAttributeById({ _id: _id }).subscribe(
      (res) => {
        this.attributeForm = res.data;
        this.showAttributeForm();
      }, (error) => {
        console.log(error);
      }
    );
  }

  showAttributeForm() {
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.products = [];
    this.variants = [];
    this.attributes = [];
    this.getCategories();
  }

  onSubmit() {
    this.attributeService.updateAttribute(this.attributeForm).subscribe(
      (res) => {
       this.hideForm();    
      }, (error) => {
        console.log(error);
      }
    );
  }

}