import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Producto {
  nombre: string;
  costo: number;
  cantidad: number;
  total: number;
}

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent {
  estadoPedido: string = ''; // Variable para almacenar el estado del pedido
  cliente: { nombre: string } = { nombre: 'Nombre del cliente' }; // Objeto cliente con nombre
  factura: { nombre: string, correo: string, telefono: string } = { nombre: '', correo: '', telefono: '' }; // Objeto factura con nombre, correo y teléfono
  envio: { direccion: string } = { direccion: 'Dirección de envío' }; // Objeto envío con dirección
  productos: Producto[] = []; // Array de productos

  displayedColumns: string[] = ['nombre', 'costo', 'cantidad', 'total']; // Columnas de la tabla de productos

  estadosPedidos: string[] = ['En Proceso', 'En Espera', 'Cancelado']; // Opciones para el estado del pedido

  constructor(private route: ActivatedRoute) {
    // Simular carga de datos desde una ruta dinámica
    this.route.params.subscribe(params => {
      // Aquí normalmente obtendrías los detalles del pedido basado en params.id y cargarías los datos correspondientes
      this.estadoPedido = 'En Proceso'; // Ejemplo de asignación de estado
      this.factura = {
        nombre: 'Cliente de ejemplo',
        correo: 'cliente@example.com',
        telefono: '1234567890'
      }; // Ejemplo de datos de factura
      this.productos = [
        { nombre: 'Producto 1', costo: 100, cantidad: 2, total: 200 },
        { nombre: 'Producto 2', costo: 50, cantidad: 3, total: 150 }
      ]; // Ejemplo de productos
    });
  }
}
