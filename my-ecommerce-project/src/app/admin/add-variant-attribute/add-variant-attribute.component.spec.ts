import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariantAttributeComponent } from './add-variant-attribute.component';

describe('AddVariantAttributeComponent', () => {
  let component: AddVariantAttributeComponent;
  let fixture: ComponentFixture<AddVariantAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVariantAttributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVariantAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
