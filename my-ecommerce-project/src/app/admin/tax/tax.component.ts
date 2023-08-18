import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxService } from 'src/app/services/tax/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  taxForm: any;
  type:any;
  constructor(private taxService: TaxService) { }

  ngOnInit(): void {
    this.getTaxForm();
  }

  getTaxForm() {
    this.taxForm = new FormGroup({
      title: new FormControl('', Validators.required),
      tax: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.taxService.addTax(this.taxForm.value).subscribe(
      res => {
        console.log(res);
      }, error => console.log(error)
    )
  }

}

 