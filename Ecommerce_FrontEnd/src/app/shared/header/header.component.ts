import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { CartDetailModel } from 'src/app/core/models/ecommerce/cartDetail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  status = false;
  cartItemCount: number = 0; // Propiedad para almacenar la cantidad de productos únicos en el carrito

  constructor(
    private authService: AuthService,
    private cartDetailService: CartDetailService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Suscríbete al método que obtiene todos los detalles del carrito
    this.cartDetailService.findAll().subscribe(
      (cartDetails) => this.cartItemCount = this.countUniqueProducts(cartDetails),
      (error) => console.error('Error al obtener los detalles del carrito', error)
    );
  }

  addToggle() {
    this.status = !this.status;
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open(`✅ Sesión Cerrada`, "Cerrar", {
      duration: 3000
    });
  }

  // Método para contar productos únicos
  private countUniqueProducts(cartDetails: CartDetailModel[]): number {
    const uniqueProducts = new Set<number>(); // Usar un Set para mantener productos únicos
    cartDetails.forEach(item => {
      if (item.productId !== undefined) {
        uniqueProducts.add(item.productId); // Solo agregar valores definidos
      }
    });
    return uniqueProducts.size; // Devuelve el número de productos únicos
  }
}
