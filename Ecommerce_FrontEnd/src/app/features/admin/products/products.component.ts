import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

const ELEMENT_DATA: Product[] = [
  { id: 1, image: 'https://via.placeholder.com/150', name: 'Manzana', price: 1.99, stock: 100 },
  { id: 2, image: 'https://via.placeholder.com/150', name: 'Banana', price: 0.99, stock: 150 },
  { id: 3, image: 'https://via.placeholder.com/150', name: 'Fresa', price: 2.99, stock: 50 },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private router: Router) {}

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
    this.router.navigate(['/admin/products/edit', row.id]);
  }

  deleteProduct(row: Product): void {
    const index = this.dataSource.indexOf(row);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource]; // Para actualizar la tabla
    }
  }
}
