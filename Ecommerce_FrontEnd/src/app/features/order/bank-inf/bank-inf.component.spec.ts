import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfComponent } from './bank-inf.component';

describe('BankInfComponent', () => {
  let component: BankInfComponent;
  let fixture: ComponentFixture<BankInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankInfComponent]
    });
    fixture = TestBed.createComponent(BankInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
