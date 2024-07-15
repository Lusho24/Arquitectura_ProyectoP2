import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  
  products = [
    {
      name: 'Producto Orgánico 1',
      date: '15/07/24',
      price: 250.00,
      image: '../../../../assets/img/product.jpg',
      colors: ['#f71515', '#6db4fe', '#000000', '#e0e0e0', '#0bff7e'],
      showActions: false // Inicializado a false
    },
    {
      name: 'Producto Orgánico 2',
      date: '15/07/24',
      price: 300.00,
      image: '../../../../assets/img/product.jpg',
      colors: ['#f71515', '#6db4fe', '#000000', '#e0e0e0', '#0bff7e'],
      showActions: false // Inicializado a false
    },
    {
      name: 'Producto Orgánico 3',
      date: '15/07/24',
      price: 200.00,
      image: '../../../../assets/img/product.jpg',
      colors: ['#f71515', '#6db4fe', '#000000', '#e0e0e0', '#0bff7e'],
      showActions: false // Inicializado a false
    }
    // Agrega más productos según sea necesario
  ];

  constructor(public dialog: MatDialog) { }

  openSignUp(): void {
    const dialogRef = this.dialog.open(ProductComponent);
  }
  
}
