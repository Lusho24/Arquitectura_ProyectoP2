import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailsComponent } from './orders-details.component';

describe('OrdersDetailsComponent', () => {
  let component: OrdersDetailsComponent;
  let fixture: ComponentFixture<OrdersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersDetailsComponent]
    });
    fixture = TestBed.createComponent(OrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
