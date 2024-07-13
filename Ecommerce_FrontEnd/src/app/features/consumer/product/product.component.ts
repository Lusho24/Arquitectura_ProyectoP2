import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    private _formBuilder: FormBuilder,
  ) { }
  private _productForm: FormGroup = this._formBuilder.group({
    id: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', Validators.required]
  });
  
  public get productForm(): FormGroup {
    return this._productForm;
  }

}
