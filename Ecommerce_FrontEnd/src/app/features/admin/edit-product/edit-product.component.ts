import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  description: string; // Asegúrate de tener esta propiedad si estás usando descripción
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  editProductForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder
  ) {
    this.editProductForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      description: [data.description, Validators.required],
      stock: [data.stock, Validators.required],
      image: [data.image]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editProductForm.valid) {
      const formData = this.editProductForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          formData.image = e.target.result;
          this.dialogRef.close(formData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.dialogRef.close(formData);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
