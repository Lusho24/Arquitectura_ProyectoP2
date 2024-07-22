import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/productModel';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product extends ProductModel {
  quantity: number;
  cartDetailId: number;
}

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.scss']
})
export class CartLayoutComponent implements OnInit {
  products: Product[] = [];
  cartId: number | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private cartDetailService: CartDetailService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartProducts();
  }

  private loadCartProducts(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id) {
      this.cartService.findByUserId(currentUser.id).subscribe(cart => {
        if (cart?.id) {
          this.cartId = cart.id;
          this.cartDetailService.findAll().subscribe(details => {
            const productDetails = details.filter(detail => detail.cartId === this.cartId);
  
            const productObservables = productDetails.map(detail =>
              this.productService.getProduct(detail.productId!).pipe(
                map(product => {
                  if (product) {
                    return {
                      ...product,
                      quantity: detail.productQuantity ?? 0,
                      cartDetailId: detail.id
                    } as Product;
                  } else {
                    console.warn(`Product with ID ${detail.productId} not found.`);
                    return {
                      id: 0,
                      categoryId: 0,
                      name: 'Unknown',
                      description: '',
                      price: 0,
                      stock: 0,
                      imageUrl: '',
                      quantity: detail.productQuantity ?? 0,
                      cartDetailId: detail.id
                    } as Product;
                  }
                })
              )
            );
  
            forkJoin(productObservables).subscribe(products => {
              this.products = products as Product[];
            });
          });
        }
      });
    }
  }

  procederAlPago(): void {
    this.cartService.setProducts(this.products);
    this.router.navigate(['/order']);
  }

  eliminarProducto(id: number): void {
    const productToRemove = this.products.find(product => product.id === id);
    if (productToRemove && productToRemove.cartDetailId) {
      this.cartDetailService.delete(productToRemove.cartDetailId).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
        if (this.products.length === 0) {
          const button = document.getElementById('proceedButton') as HTMLButtonElement;
          if (button) {
            button.disabled = false;
            button.innerText = 'Regresar a la tienda';
          }
        }
      });
    }
  }

  onClickProceed(): void {
    if (this.products.length > 0) {
      this.cartService.setProducts(this.products);
      this.router.navigate(['/order']);
    } else {
      this.router.navigate(['/ecovida/shop']);
    }
  }

  calcularTotal(): number {
    return this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }

  incrementarCantidad(product: Product): void {
    if (product.quantity < product.stock) {
      product.quantity++;
      this.actualizarCantidadProducto(product);
    }
  }

  decrementarCantidad(product: Product): void {
    if (product.quantity > 0) {
      product.quantity--;
      this.actualizarCantidadProducto(product);
    }
  }

  private actualizarCantidadProducto(product: Product): void {
    this.cartDetailService.updateProductQuantity(product.cartDetailId, product.quantity).subscribe();
  }
}
