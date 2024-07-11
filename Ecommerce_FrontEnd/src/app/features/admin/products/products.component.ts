import { Component } from '@angular/core';

import { ColumnMode } from '@swimlane/ngx-datatable';

import { MatDialog } from '@angular/material/dialog';

import { AddProductComponent } from '../add-product/add-product.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent 
{
  mode = 'page'; 
  ColumnMode = ColumnMode; 
  rows = [
    { 
      image: 'https://via.placeholder.com/150', 
      name: 'Manzana', 
      price: 1.99, 
      stock: 100 
    },
    { 
      image: 'https://via.placeholder.com/150', 
      name: 'Banana', 
      price: 0.99, 
      stock: 150 
    },
    { 
      image: 'https://via.placeholder.com/150', 
      name: 'Fresa', 
      price: 2.99, 
      stock: 50 
    }
  ]; // Datos quemados
  columns = [
    { name: 'Imagen del Producto', prop: 'image'},
    { name: 'Nombre del Producto', prop: 'name' },
    { name: 'Precio del Producto', prop: 'price' },
    { name: 'Stock del Producto', prop: 'stock' },
    { name: 'Acciones', prop: 'acciones' }
  ]; // Columnas definidas



  constructor(public dialog: MatDialog) {}

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rows.push(result);
        this.rows = [...this.rows]; // Para actualizar la tabla
      }
    });
  }

  editProduct(row: any): void {
    console.log('Editar producto', row);
  }

  deleteProduct(row: any): void {
    console.log('Eliminar producto', row);
  }


}
