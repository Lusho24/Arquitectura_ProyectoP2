import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingComponent } from './edit-shipping.component';

describe('EditShippingComponent', () => {
  let component: EditShippingComponent;
  let fixture: ComponentFixture<EditShippingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditShippingComponent]
    });
    fixture = TestBed.createComponent(EditShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
