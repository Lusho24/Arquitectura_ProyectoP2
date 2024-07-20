import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { PurchaseOrderModel } from 'src/app/core/models/ecommerce/purchaseOrder';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fechaOrden', 'estado', 'total', 'detallePedido'];
  dataSource: any[] = [];

  constructor(
    private router: Router,
    public sidebarservice: SidebarService,
    private purchaseOrderService: PurchaseOrderService,
    private paymentOrderService: PaymentOrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.purchaseOrderService.findAll().subscribe(
      (orders: PurchaseOrderModel[]) => {
        this.dataSource = [];
        orders.forEach(order => {
          if (order.paymentOrderId !== undefined) {
            this.paymentOrderService.findById(order.paymentOrderId).subscribe(
              (payment: PaymentOrderModel) => {
                this.dataSource.push({
                  id: order.id,
                  fechaOrden: order.creationDate,
                  estado: order.state,
                  total: payment.total,
                  detallePedido: order.id 
                });
                this.dataSource = [...this.dataSource]; // Forzar actualización
              },
              error => {
                console.error('Error fetching payment order', error);
              }
            );
          } else {
            // Manejar el caso en que paymentOrderId no está definido
            this.dataSource.push({
              id: order.id,
              fechaOrden: order.creationDate,
              estado: order.state,
              total: 0, // O algún valor por defecto
              detallePedido: order.id
            });
          }
        });
      },
      error => {
        console.error('Error fetching orders', error);
      }
    );
  }

  verDetalle(pedido: any) {
    this.router.navigate(['/admin/ordersDetails', pedido.id]);
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
