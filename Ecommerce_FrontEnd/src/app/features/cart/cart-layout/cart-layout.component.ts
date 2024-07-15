import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.scss']
})
export class CartLayoutComponent {

  products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 100, quantity: 1, imageUrl: 'assets/img/product.jpg' },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 150, quantity: 1, imageUrl: 'assets/img/product.jpg' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 200, quantity: 1, imageUrl: 'assets/img/product.jpg' }
  ];

  constructor(private router: Router) { }

  procederAlPago(): void {
    this.router.navigate(['/order']);
  }

  eliminarProducto(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    if (this.products.length === 0) {
      const button = document.getElementById('proceedButton') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerText = 'Regresar a la tienda';
      }
    }
  }

  onClickProceed(): void {
    if (this.products.length > 0) {
      this.router.navigate(['/order']);
    } else {
      this.router.navigate(['/ecovida/shop']);
    }
  }

  calcularTotal(): number {
    return this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }
}
