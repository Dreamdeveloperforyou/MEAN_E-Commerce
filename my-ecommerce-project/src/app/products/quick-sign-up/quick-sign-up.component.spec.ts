import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSignUpComponent } from './quick-sign-up.component';

describe('QuickSignUpComponent', () => {
  let component: QuickSignUpComponent;
  let fixture: ComponentFixture<QuickSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
