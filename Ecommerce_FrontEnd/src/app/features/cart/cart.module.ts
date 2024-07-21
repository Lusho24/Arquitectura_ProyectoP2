import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartLayoutComponent } from './cart-layout/cart-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CartLayoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    FormsModule ,
    MatIconModule
  ]
})
export class CartModule { }
