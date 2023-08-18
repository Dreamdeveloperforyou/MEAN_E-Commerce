import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products/products.service';
import { VariantService } from 'src/app/services/variant/variant.service';

@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.scss']
})

 export class AddVariantComponent implements OnInit {

  variantForm: any;
  products: any;
  selectedColourFile: any;
  selectedProductFile: any;

  constructor(private productService: ProductService, private variantService: VariantService) { };
  
  ngOnInit(): void {
    this.getProducts();
    this.Form();
  }


  Form() {
    this.variantForm = new FormGroup({
      product_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', Validators.required),
      colour: new FormControl('', Validators.required),
      color_image: new FormControl('', Validators.required),
      product_image: new FormControl('', Validators.required)
    });
  }


  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res.data;
        console.log('product', this.products);
      }, (error) => {
        console.log(error);
      }
    )
 }
 
  onSelectedColourFile(event: any) {
    const file = event.target.files[0];
    console.log('files', file);
    this.selectedColourFile = event.target.files[0];
  }


  onSelectedProductFile(event: any) { 
    const images = event.target.files;
    this.selectedProductFile = images;
  };


  onSubmit() {
    console.log('form', this.variantForm.value);
    const formData = new FormData();
    formData.append('product_id', this.variantForm.get('product_id').value);
    formData.append('name', this.variantForm.get('name').value);
    formData.append('price', this.variantForm.get('price').value);
    formData.append('quantity', this.variantForm.get('quantity').value);
    formData.append('colour', this.variantForm.get('colour').value);
    formData.append('colour_image', this.selectedColourFile);
    for(let i=0;i<this.selectedProductFile.length;i++){
      formData.append('variant_image', this.selectedProductFile[i]);
    }

    this.variantService.addVariant(formData).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    );
  }

  
   
}   