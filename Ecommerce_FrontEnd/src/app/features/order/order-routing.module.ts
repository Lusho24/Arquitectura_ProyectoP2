import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderLayoutComponent } from './order-layout/order-layout.component';

const routes: Routes = [
  { path: '', component: OrderLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
