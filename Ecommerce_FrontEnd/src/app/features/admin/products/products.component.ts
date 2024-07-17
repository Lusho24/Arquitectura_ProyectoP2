import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { ProductModel } from 'src/app/model/productModel'; // Asegúrate de importar la interfaz correcta aquí
import { AddProductComponent } from '../add-product/add-product.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'actions'];
  dataSource: ProductModel[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public sidebarservice: SidebarService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.dataSource = products;
        console.log('Productos cargados correctamente:', this.dataSource);
      },
      error => {
        console.error('Error fetching products:', error);
        // Manejo de errores, como mostrar un mensaje al usuario
      }
    );
  }

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

  editProduct(row: ProductModel): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.dataSource[index] = result;
          this.dataSource = [...this.dataSource]; // Para actualizar la tabla
        }
      }
    });
  }

  deleteProduct(row: ProductModel): void {
    this.productService.deleteProduct(row.id).subscribe(
      response => {
        console.log('Product deleted successfully:', response);
        const index = this.dataSource.indexOf(row);
        if (index !== -1) {
          this.dataSource.splice(index, 1);
          this.dataSource = [...this.dataSource];
        }
      },
      error => {
        console.error('Error deleting product:', error);
        // Manejo de errores, como mostrar un mensaje al usuario
      }
    );
  }

  toggleSidebar(): void {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  toggleBackgroundImage(): void {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  getSideBarState(): boolean {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar(): void {
    this.sidebarservice.setSidebarState(true);
  }
}
