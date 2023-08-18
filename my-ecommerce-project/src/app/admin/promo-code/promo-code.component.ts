import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocodeService } from 'src/app/services/promo/promocode.service';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {

  promocodeForm: any;

  constructor(private promocodeService: PromocodeService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPromocodeForm();
  }

  getPromocodeForm() {
    this.promocodeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      promoCode: new FormControl('', Validators.required),
      discount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      expiry_date: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.promocodeService.savePromocode(this.promocodeForm.value).subscribe(
      res => {
        console.log('res',res);
        this.router.navigate(['/admin/admin-dashboard/givePromocode']);
      }, error => console.log(error)
    );
  }
}