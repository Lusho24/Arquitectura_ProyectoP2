import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { AddShippingComponent } from './add-shipping/add-shipping.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


@NgModule({
  declarations: [
    HomeAdminComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    ShippingComponent,
    AddShippingComponent,
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
