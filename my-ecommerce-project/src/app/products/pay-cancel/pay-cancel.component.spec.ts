import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCancelComponent } from './pay-cancel.component';

describe('PayCancelComponent', () => {
  let component: PayCancelComponent;
  let fixture: ComponentFixture<PayCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
