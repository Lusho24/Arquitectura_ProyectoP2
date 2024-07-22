import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { ShipmentService } from 'src/app/core/services/ecommerce/shipment.service';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'shipment', 'method', 'state', 'total', 'actions'];
  dataSource: PaymentOrderModel[] = [];
  shipments: ShipmentModel[] = [];

  constructor(
    private paymentOrderService: PaymentOrderService,
    private shipmentService: ShipmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadShipments();
  }

  loadOrders(): void {
    this.paymentOrderService.findAll().subscribe(
      data => this.dataSource = data,
      error => this.snackBar.open('Error al cargar los pedidos', 'Cerrar', { duration: 3000 })
    );
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      data => this.shipments = data,
      error => this.snackBar.open('Error al cargar los métodos de envío', 'Cerrar', { duration: 3000 })
    );
  }

  getShipmentName(shipmentId: number): string {
    const shipment = this.shipments.find(s => s.id === shipmentId);
    return shipment && shipment.name ? shipment.name : 'Desconocido';
  }

  updateOrderStatus(order: PaymentOrderModel, newStatus: string): void {
    if (order.state !== newStatus) {
      const updatedOrder: PaymentOrderModel = { ...order, state: newStatus };
      this.paymentOrderService.save(updatedOrder).subscribe(
        () => {
          this.snackBar.open('Estado actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.loadOrders(); // Recargar la lista después de actualizar
        },
        error => this.snackBar.open('Error al actualizar el estado', 'Cerrar', { duration: 3000 })
      );
    }
  }

  updateState(order: PaymentOrderModel): void {
    if (order.state) {
      this.updateOrderStatus(order, order.state);
    }
  }
}
