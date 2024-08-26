import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { ProductModel } from 'src/app/model/productModel'; // Asegúrate de importar la interfaz correcta aquí
import { AddProductComponent } from '../add-product/add-product.component';
import { AuthService } from 'src/app/core/services/login/auth.service';
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
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.idTienda) {
      const storeId = currentUser.idTienda; // Mantén el tipo numérico
      
      this.productService.getAllProducts().subscribe(
        products => {
          // Filtrar los productos por el ID de la tienda
          this.dataSource = products.filter(product => product.storeId === storeId);
          console.log('Productos filtrados por ID de tienda:', this.dataSource);
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID de la tienda del usuario.');
    }
  }
  
  

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource]; 
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
          this.dataSource = [...this.dataSource]; 
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