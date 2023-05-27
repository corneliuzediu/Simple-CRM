import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProductCustomerComponent } from './dialog-add-product-customer.component';

describe('DialogAddProductCustomerComponent', () => {
  let component: DialogAddProductCustomerComponent;
  let fixture: ComponentFixture<DialogAddProductCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddProductCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddProductCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
