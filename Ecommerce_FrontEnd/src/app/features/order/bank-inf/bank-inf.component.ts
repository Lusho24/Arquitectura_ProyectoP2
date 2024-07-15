import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-inf',
  templateUrl: './bank-inf.component.html',
  styleUrls: ['./bank-inf.component.scss']
})
export class BankInfComponent {

  constructor(public dialogRef: MatDialogRef<BankInfComponent>, private router: Router) {}

  goHome(): void {
    this.dialogRef.close();
    this.router.navigate(['']);
  }
}
