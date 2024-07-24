import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankInfComponent } from '../bank-inf/bank-inf.component';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { ShipmentService } from 'src/app/core/services/ecommerce/shipment.service';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { ProductService } from 'src/app/services/product.service'; // Importa ProductService
import { Observable, switchMap } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss']
})
export class OrderLayoutComponent implements OnInit {
  termsAccepted: boolean = false;
  metodoPago: string = 'bankTransfer';
  selectedSector: string = 'Quito';
  envio: number = 0;
  total: number = 0;
  subtotal: number = 0;
  products: Product[] = [];
  shipments: ShipmentModel[] = [];
  selectedShipment: ShipmentModel | null = null;
  currentUser: any; // Propiedad para almacenar los datos del usuario actual

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService,
    private shipmentService: ShipmentService,
    private paymentOrderService: PaymentOrderService,
    private purchaseOrderService: PurchaseOrderService,
    private authService: AuthService,
    private cartDetailService: CartDetailService,
    private productService: ProductService // Inyecta ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.products$.subscribe(productModels => {
      this.products = productModels.map(productModel => ({
        ...productModel,
        quantity: (productModel as any).quantity // Asegúrate de que la cantidad se copie correctamente
      }));
      console.log('Productos cargados:', this.products);
      this.updateTotals();
    });

    this.loadShipments();

    // Obtén el usuario actual al inicializar el componente
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      console.error('No user found');
    } else {
      console.log('Usuario actual:', this.currentUser);
    }
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      (data) => {
        this.shipments = data;
        if (this.shipments.length > 0) {
          this.selectedShipment = this.shipments[0];
          this.updateShippingCost();
        }
      },
      (error) => {
        console.error('Error al cargar los métodos de envío', error);
      }
    );
  }

  updateShippingCost(): void {
    if (this.selectedShipment) {
      this.envio = this.selectedShipment.price || 0;
      this.updateTotals();
    }
  }

  realizarPedido(): void {
    console.log('Realizar pedido - términos aceptados:', this.termsAccepted);
    console.log('Método de pago seleccionado:', this.metodoPago);

    if (this.termsAccepted) {
      if (this.metodoPago === 'bankTransfer') {
        this.createPaymentOrder().subscribe((paymentOrder) => {
          console.log('Orden de pago creada:', paymentOrder);

          this.createPurchaseOrder(paymentOrder.id).subscribe(() => {
            this.updateProductStock(); // Actualiza el stock de los productos
            this.openBankInfoModal();
            this.clearCartDetails();
          });
        });
      } else if (this.metodoPago === 'creditCard') {
        this.integrarPasarelaPago();
      }
    }
  }
  
  private createPaymentOrder(): Observable<any> {
    if (!this.currentUser || !this.currentUser.id) {
      throw new Error('User not authenticated or user ID is missing');
    }

    return this.cartService.findByUserId(this.currentUser.id).pipe(
      switchMap(cart => {
        if (!cart || !cart.id) {
          throw new Error('No cart found for the user');
        }

        const paymentOrder = {
          cartId: cart.id,
          shipmentId: this.selectedShipment?.id,
          method: 'TRANSFERENCIA',
          state: 'PENDIENTE',
          total: this.total
        };

        console.log('Datos de la orden de pago:', paymentOrder);

        return this.paymentOrderService.save(paymentOrder);
      })
    );
  }
  
  private createPurchaseOrder(paymentOrderId: number): Observable<any> {
    const purchaseOrder = {
      paymentOrderId: paymentOrderId,
      creationDate: new Date(),
      state: 'EN PROCESO'
    };

    console.log('Datos de la orden de compra:', purchaseOrder);
  
    return this.purchaseOrderService.save(purchaseOrder);
  }
  
  private clearCartDetails(): void {
    this.cartService.getProducts().forEach(product => {
      console.log("este es" ,product.id)
      this.cartDetailService.findById(product.id).subscribe(cartDetail => {
        if (cartDetail && cartDetail.id !== undefined) {
          
          this.cartDetailService.delete(cartDetail.id).subscribe(() => {
            // Actualizar el estado del carrito o manejar la UI
          });
        } else {
          console.error('Cart detail ID is undefined');
        }
      });
    });
  }

  openBankInfoModal(): void {
    const dialogRef = this.dialog.open(BankInfComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  integrarPasarelaPago(): void {
    console.log('Integración con pasarela de pagos de dLocalGo');
  }

  onSectorChange(event: any): void {
    this.selectedSector = event.value;
    this.updateShippingCost();
  }

  onShipmentChange(event: any): void {
    this.selectedShipment = event.value;
    this.updateShippingCost();
  }

  updateTotals(): void {
    this.subtotal = this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    this.total = this.subtotal + this.envio;
    console.log('Subtotal:', this.subtotal, 'Total:', this.total);
  }

  private updateProductStock(): void {
    this.products.forEach(product => {
      this.productService.getProduct(product.id).subscribe({
        next: (existingProduct) => {
          if (existingProduct) {
            // Calcula el nuevo stock restando la cantidad de productos en el carrito
            const newStock = existingProduct.stock - product.quantity;
            console.log('Datos antes de actualizar el producto:', {
              id: existingProduct.id,
              categoryId: existingProduct.categoryId,
              name: existingProduct.name,
              description: existingProduct.description,
              price: existingProduct.price,
              stock: newStock, // Solo actualizar el stock
              imageUrl: existingProduct.imageUrl
            });
  
            // Llama al método para actualizar solo el stock del producto
            this.productService.updateProductStock(existingProduct.id, newStock).subscribe({
              next: (response) => {
                console.log('Stock del producto actualizado:', response);
              },
              error: (err) => {
                console.error('Error al actualizar el stock del producto:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener el producto:', err);
        }
      });
    });
  }
  
  
  
}
