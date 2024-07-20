import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private authService: AuthService
  ) {}

  increaseQuantity(): void {
    this.quantity++;
    this.updateTotal();
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
        } else {
          console.error('No se encontró un carrito para el usuario');
        }
      }, error => {
        console.error('Error al obtener el carrito del usuario:', error);
      });
    }
  }
}
