import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderLayoutComponent } from './order-layout/order-layout.component';
import { BankInfComponent } from './bank-inf/bank-inf.component';

const routes: Routes = [
  { path: '', component: OrderLayoutComponent },
  { path: 'bankInf', component: BankInfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
