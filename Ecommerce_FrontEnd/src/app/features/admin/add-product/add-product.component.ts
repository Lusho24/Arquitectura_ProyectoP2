import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  addProductForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.addProductForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      price: [data?.price || 0, Validators.required],
      description: [data?.description || '', Validators.required],
      stock: [data?.stock || 0, Validators.required],
      image: [data?.image || null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;

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
