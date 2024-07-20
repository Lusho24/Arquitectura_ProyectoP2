import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/productModel';
import { ProductComponent } from 'src/app/features/consumer/product/product.component';
@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = []; // Cambiado a any[] para permitir propiedades adicionales
  //products: ProductModel[] = []; // Inicializa el arreglo de productos

  constructor(public dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: ProductModel[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  openSignUp(product: any): void {
    this.dialog.open(ProductComponent, {
      data: product
    });
  }
}
