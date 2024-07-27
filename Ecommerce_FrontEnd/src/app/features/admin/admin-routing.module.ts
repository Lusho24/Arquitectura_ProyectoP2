import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { ProductsComponent } from './products/products.component';

import { ShippingComponent } from './shipping/shipping.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PaymentsComponent } from './payments/payments.component';
import { authGuard } from 'src/app/core/guards/auth.guard';



const routes: Routes = [
  { path: '', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: HomeAdminComponent 
  },
  { path: 'orders', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: OrdersComponent 

  },
  { path: 'payments', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: PaymentsComponent 
  },
  { path: 'ordersDetails/:id', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: OrdersDetailsComponent 

  },
  { path: 'products', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: ProductsComponent 

  },
  //shipping
  { path: 'shipping', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: ShippingComponent 

  },


  //aqui iria la ruta que quiero redirigir 
  { path: 'products/add', 
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' },
    component: AddProductComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
