import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/productModel';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { CartDetailModel } from 'src/app/core/models/ecommerce/cartDetail';
import { CartModel } from 'src/app/core/models/ecommerce/cartModel';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = []; // Cambiado a any[] para permitir propiedades adicionales

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private cartDetailService: CartDetailService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) { }

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

  addToCart(product: ProductModel): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id && product?.id) {
      this.cartService.findByUserId(currentUser.id).subscribe((cart: CartModel) => {
        if (cart?.id) {
          this.cartDetailService.findAll().subscribe(details => {
            const productInCart = details.find(detail => detail.cartId === cart.id && detail.productId === product.id);
            
            if (productInCart) {
              // Mostrar notificación de que el producto ya está en el carrito
              this.snackBar.open('El producto ya está en el carrito.', 'Cerrar', {
                duration: 3000,
              });
            } else {
              const cartDetail: CartDetailModel = {
                productId: product.id,
                cartId: cart.id,
                productQuantity: 1 // Cantidad fija de 1
              };

              this.cartDetailService.save(cartDetail).subscribe(() => {
                this.snackBar.open('Producto agregado al carrito.', 'Cerrar', {
                  duration: 3000,
                });
              }, error => {
                console.error('Error al añadir al carrito:', error);
              });
            }
          }, error => {
            console.error('Error al obtener los detalles del carrito:', error);
          });
        } else {
          console.error('No se encontró un carrito para el usuario');
        }
      }, error => {
        console.error('Error al obtener el carrito del usuario:', error);
      });
    }
  }
}
