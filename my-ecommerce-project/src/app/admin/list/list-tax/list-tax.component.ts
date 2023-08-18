import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/products.service';
import { TaxService } from 'src/app/services/tax/tax.service';
@Component({
  selector: 'app-list-tax',
  templateUrl: './list-tax.component.html',
  styleUrls: ['./list-tax.component.scss']
})
export class ListTaxComponent implements OnInit {

  products: any = [];
  taxes: any = [];
  showList: boolean = false;
  assignTaxForm: any = {
    tax: '',
    product: ''
  }

  constructor(private productService: ProductService, private taxService: TaxService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTax();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res.data;
      }, error => console.log(error)
    );
  }

  getTax() {
    this.taxService.getTax().subscribe(
      res => {
        this.taxes = res.data;
      }, error => console.log(error)
    );
  }

  assignTax() {
    this.showList = true;
  }

  onSubmit() {
    this.taxService.addAssignTax(this.assignTaxForm).subscribe(
      res => {
        this.showList = false;
        this.assignTaxForm.tax = '';
        this.assignTaxForm.product = '';
      }, error => console.log(error)
    );
  }

  cancel() {
    this.showList = false;
    this.assignTaxForm.tax = '';
    this.assignTaxForm.product = '';
  }

}