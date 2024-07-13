import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerRoutingModule } from './consumer-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';




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
    SharedModule,

  ]
})
export class ConsumerModule { }
