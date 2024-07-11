import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

export interface Product {
  image: string;
  name: string;
  price: number;
  stock: number;
}

const ELEMENT_DATA: Product[] = [
  { image: 'https://via.placeholder.com/150', name: 'Manzana', price: 1.99, stock: 100 },
  { image: 'https://via.placeholder.com/150', name: 'Banana', price: 0.99, stock: 150 },
  { image: 'https://via.placeholder.com/150', name: 'Fresa', price: 2.99, stock: 50 },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource]; // Para actualizar la tabla
      }
    });
  }

  editProduct(row: Product): void {
    console.log('Editar producto', row);
  }

  deleteProduct(row: Product): void {
    console.log('Eliminar producto', row);
  }
}
