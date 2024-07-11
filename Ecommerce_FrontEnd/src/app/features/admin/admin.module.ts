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
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    HomeAdminComponent,
    ProductsComponent,
    EditProductComponent,
    
    OrdersComponent,
    OrdersDetailsComponent,
    ShippingComponent,
    AddShippingComponent,
    EditShippingComponent,
    AddShippingComponent,
    AddProductComponent,
    HomeAdminComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxDatatableModule
  ],

})
export class AdminModule { }
