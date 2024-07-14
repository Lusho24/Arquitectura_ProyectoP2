import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartLayoutComponent } from './cart-layout/cart-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CartLayoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
