import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';

@Component({
  selector: 'app-edit-shipping',
  templateUrl: './edit-shipping.component.html',
  styleUrls: ['./edit-shipping.component.scss']
})
export class EditShippingComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShipmentModel
  ) {
    this.form = this.fb.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      price: [data.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
