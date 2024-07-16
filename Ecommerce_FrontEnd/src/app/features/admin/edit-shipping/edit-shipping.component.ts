import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shipping } from '../shipping/shipping.component';

@Component({
  selector: 'app-edit-shipping',
  templateUrl: './edit-shipping.component.html',
  styleUrls: ['./edit-shipping.component.scss']
})
export class EditShippingComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Shipping
  ) {
    this.form = this.fb.group({
      ciudad: [data.ciudad, Validators.required],
      valorTotal: [data.valorTotal, Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      const updatedShipping: Shipping = {
        id: this.data.id,
        ciudad: this.form.value.ciudad,
        valorTotal: this.form.value.valorTotal
      };
      this.dialogRef.close(updatedShipping);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
