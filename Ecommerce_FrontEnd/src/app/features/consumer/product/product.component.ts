import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { ProductModel } from 'src/app/model/productModel';
import { CartDetailModel } from 'src/app/core/models/ecommerce/cartDetail';
import { CartModel } from 'src/app/core/models/ecommerce/cartModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public price: number = 250.00;
  public quantity: number = 1;
  public total: number = this.price;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
    private cartDetailService: CartDetailService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.price = product.price;
    this.updateTotal();
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
      this.updateTotal();
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  updateTotal(): void {
    this.total = this.quantity * this.price;
  }

  addToCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id && this.product?.id) {
      this.cartService.findByUserId(currentUser.id).subscribe((cart: CartModel) => {
        if (cart?.id) {
          this.cartDetailService.findAll().subscribe(details => {
            const productInCart = details.find(detail => detail.cartId === cart.id && detail.productId === this.product.id);
            
            if (productInCart) {
              // Mostrar notificación de que el producto ya está en el carrito
              this.snackBar.open('El producto ya está en el carrito.', 'Cerrar', {
                duration: 3000,
              });
            } else {
              const cartDetail: CartDetailModel = {
                productId: this.product.id,
                cartId: cart.id,
                productQuantity: this.quantity
              };

              this.cartDetailService.save(cartDetail).subscribe(response => {
                // Manejar la respuesta exitosa
                this.dialogRef.close();
              }, error => {
                // Manejar el error
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
