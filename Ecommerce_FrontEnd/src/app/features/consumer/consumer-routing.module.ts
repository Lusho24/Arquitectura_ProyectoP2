import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ecovida' },
  { path: 'ecovida', component: HomeComponent },
  { path: 'ecovida/shop', component: ProductCatalogComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }
