import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankInfComponent } from '../bank-inf/bank-inf.component';

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss']
})
export class OrderLayoutComponent {

  termsAccepted: boolean = false;
  metodoPago: string = 'bankTransfer';
  selectedSector: string = 'Quito';
  envio: number = 10;
  total: number = 85;
  private clientId: string;
  private clientSecret: string;
  private apiUrl: string;

  constructor(private router: Router, public dialog: MatDialog) {
    this.clientId = 'tu-client-id';
    this.clientSecret = 'tu-client-secret';
    this.apiUrl = 'https://sandbox.dlocal.com';
  }

  // Función para realizar el pedido
  realizarPedido(): void {
    if (this.termsAccepted) {
      if (this.metodoPago === 'bankTransfer') {
        this.openBankInfoModal();
      } else if (this.metodoPago === 'creditCard') {
        this.integrarPasarelaPago();
      }
    }
  }

  openBankInfoModal(): void {
    const dialogRef = this.dialog.open(BankInfComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  // Simulación de integración con pasarela de pagos de dLocalGo
  integrarPasarelaPago(): void {
    // Aquí iría la lógica para integrar con dLocalGo
    console.log('Integración con pasarela de pagos de dLocalGo');
  }

  onSectorChange(event: any) {
    if (event.value === 'Quito') {
      this.envio = 10;
    } else if (event.value === 'Sangolqui') {
      this.envio = 6;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.total = 80 + this.envio;
  }
}
