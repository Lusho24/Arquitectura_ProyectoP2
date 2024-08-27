import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { OrderDetailService } from 'src/app/core/services/ecommerce/order-detail.service'; 
import { PurchaseOrderModel } from 'src/app/core/models/ecommerce/purchaseOrder';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';
import { UserModel } from 'src/app/core/models/login/userModel';
import { OrderDetailModel } from 'src/app/core/models/ecommerce/orderDetail'; 
import { UserService } from 'src/app/core/services/login/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
  estadoPedido: string = '';
  estadosPedidos: string[] = ['COMPLETADO', 'EN PROCESO'];
  cliente: { nombre: string; correo: string; telefono: string } = { nombre: '', correo: '', telefono: '' };
  factura: { nombre: string; correo: string; telefono: string } = { nombre: '', correo: '', telefono: '' };
  envio: { direccion: string } = { direccion: '' };
  productos: OrderDetailModel[] = []; 
  displayedColumns: string[] = ['nombre', 'costo', 'cantidad', 'total'];
  currentOrder: PurchaseOrderModel = {} as PurchaseOrderModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private paymentOrderService: PaymentOrderService,
    private cartService: CartService,
    private userService: UserService,
    private orderDetailService: OrderDetailService, 
    private productService: ProductService // Inyecta ProductService
  ) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;
    if (!isNaN(orderId)) {
      this.loadOrderDetails(orderId);
    }
  }

  loadOrderDetails(orderId: number): void {
    this.purchaseOrderService.findById(orderId).subscribe(order => {
      this.currentOrder = order;
      this.estadoPedido = order.state || '';

      if (order.paymentOrderId !== undefined) {
        this.paymentOrderService.findById(order.paymentOrderId).subscribe(payment => {
          if (payment.cartId !== undefined) {
            this.cartService.findById(payment.cartId).subscribe(cart => {
              const userId = cart.userId;
              if (userId) {
                this.userService.findById(userId).subscribe((user: UserModel) => {
                  this.cliente = {
                    nombre: user.name || '',
                    correo: user.email || '',
                    telefono: user.phone || ''
                  };
                  this.envio.direccion = user.address || '';
                });
              }

              this.orderDetailService.findOrderDetailsByPurchaseOrderId(orderId).subscribe(orderDetails => {
                const productIds = orderDetails.map(detail => parseInt(detail.name || '0', 10)); // Convierte name a número
                this.productService.getAllProducts().subscribe(products => {
                  const productMap = new Map<number, string>(); // Crea un mapa para buscar nombres por ID
                  products.forEach(product => {
                    productMap.set(product.id, product.name);
                  });

                  this.productos = orderDetails.map(detail => {
                    const productId = parseInt(detail.name || '0', 10); // Convierte name a número
                    return {
                      ...detail,
                      name: productMap.get(productId) || 'Desconocido', // Usa el nombre del producto
                      total: detail.price! * (detail.productQuantity || 0)
                    };
                  });
                });
              });
            });
          }
        });
      }
    });
  }

  updateOrderState(newState: string): void {
    const updatedOrder: Partial<PurchaseOrderModel> = {
      state: newState 
    };
  
    if (this.currentOrder.id !== undefined) {
      this.purchaseOrderService.updateState(this.currentOrder.id!, newState).subscribe(response => {
        console.log('Estado del pedido actualizado');
        this.router.navigate(['/admin/orders']);
      }, error => {
        console.error('Error al actualizar el estado del pedido', error);
        // manejar errores
      });
    } else {
      console.error('ID de la orden no definido');
      // manejar errores
    }
  }
}
