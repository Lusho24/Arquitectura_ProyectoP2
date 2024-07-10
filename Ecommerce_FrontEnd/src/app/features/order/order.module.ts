import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderLayoutComponent } from './order-layout/order-layout.component';
import { BankInfComponent } from './bank-inf/bank-inf.component';


@NgModule({
  declarations: [
    OrderLayoutComponent,
    BankInfComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
