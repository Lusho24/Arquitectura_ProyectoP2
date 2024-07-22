import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { AddShippingComponent } from './add-shipping/add-shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { PaymentsComponent } from './payments/payments.component';

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
    SidebarComponent,
    OrdersComponent,
    PaymentsComponent
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
    MatTableModule, 
    MatChipsModule,
    MatListModule,


    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule

  ],
})
export class AdminModule { }
export class OrdersModule { }