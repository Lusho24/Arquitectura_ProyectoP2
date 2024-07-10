import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerRoutingModule } from './consumer-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ProductCatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ConsumerRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ConsumerModule { }
