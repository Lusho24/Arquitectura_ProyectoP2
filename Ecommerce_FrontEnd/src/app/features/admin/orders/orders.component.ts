import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';

export interface Pedido {
  id: number;
  fechaOrden: string;
  estado: string;
  total: number;
}

const ELEMENT_DATA: Pedido[] = [
  { id: 1, fechaOrden: '2023-07-10', estado: 'Procesado', total: 100 },
  { id: 2, fechaOrden: '2023-07-11', estado: 'En Espera', total: 150 },
  { id: 3, fechaOrden: '2023-07-12', estado: 'Cancelado', total: 50 },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  displayedColumns: string[] = ['id', 'fechaOrden', 'estado', 'total', 'detallePedido'];
  dataSource = ELEMENT_DATA;

  estadosPedidos: string[] = ['Procesado', 'En Espera', 'Cancelado']; // Opciones para el estado del pedido

  constructor(private router: Router, public sidebarservice: SidebarService) {}

  verDetalle(pedido: Pedido) {
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
