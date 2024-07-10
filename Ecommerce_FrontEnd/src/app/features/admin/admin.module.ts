import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { AddshippingComponent } from './addshipping/addshipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { AddShippingComponent } from './add-shipping/add-shipping.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    ShippingComponent,
    AddshippingComponent,
    EditShippingComponent,
    AddShippingComponent,
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
