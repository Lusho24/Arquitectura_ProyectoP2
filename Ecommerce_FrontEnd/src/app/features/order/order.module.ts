import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderLayoutComponent } from './order-layout/order-layout.component';
import { BankInfComponent } from './bank-inf/bank-inf.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    OrderLayoutComponent,
    BankInfComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule

  ]
})
export class OrderModule { }
