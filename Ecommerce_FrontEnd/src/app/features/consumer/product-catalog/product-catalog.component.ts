import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  constructor(
    public dialog: MatDialog,
    
  ) { }

  openSignUp(): void {
    const dialogRef = this.dialog.open(ProductComponent);
  }
  
}
