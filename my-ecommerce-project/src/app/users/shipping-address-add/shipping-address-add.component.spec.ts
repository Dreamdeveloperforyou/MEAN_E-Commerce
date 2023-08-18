import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressAddComponent } from './shipping-address-add.component';

describe('ShippingAddressAddComponent', () => {
  let component: ShippingAddressAddComponent;
  let fixture: ComponentFixture<ShippingAddressAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingAddressAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAddressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
