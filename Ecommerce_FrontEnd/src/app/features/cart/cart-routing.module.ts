import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartLayoutComponent } from './cart-layout/cart-layout.component';

const routes: Routes = [
  { path: '', component: CartLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
