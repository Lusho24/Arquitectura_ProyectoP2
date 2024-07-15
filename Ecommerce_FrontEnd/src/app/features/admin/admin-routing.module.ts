import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { ProductsComponent } from './products/products.component';
import { ShippingComponent } from './shipping/shipping.component';
import { AddProductComponent } from './add-product/add-product.component';
//import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  { path: '', component: HomeAdminComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'ordersDetails', component: OrdersDetailsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shipping', component: ShippingComponent },
  //aqui iria la ruta que quiero redirigir 
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/edit/:id', component: EditProductComponent } // Nueva ruta para editar productos
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
